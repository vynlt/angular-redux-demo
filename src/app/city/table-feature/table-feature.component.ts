import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NzTableLayout, NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { selectCityList } from '../city.selectors';
import { AppState } from 'src/app/app.state';
import { deleteCity } from '../city.actions';

interface ItemData {
  name: string;
  code: number | string;
  checked: boolean;
  expand: boolean;
  disabled?: boolean;
}

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
  size: NzTableSize;
  tableScroll: string;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
  paginationType: NzTablePaginationType;
}

@Component({
  selector: 'app-table-feature',
  templateUrl: './table-feature.component.html',
  styleUrls: ['./table-feature.component.less']
})
export class TableFeatureComponent implements OnInit {
  isVisible = false;
  settingForm?: FormGroup;
  listOfData: readonly ItemData[] = [];
  displayData: readonly ItemData[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;

  cities$: Observable<AppState> = this.store.pipe(select(selectCityList));
  data: any;
  
  currentPageDataChange($event: readonly ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  showModal(): void {
    this.isVisible = true;
  }

  onVisibleChange(isVisible: boolean) {
  
    this.isVisible = isVisible;
  }

  onRemoveCity(value){
    this.store.dispatch(deleteCity({city: value}));
  }

  // generateData(): readonly ItemData[] {
  //   const data = [
  //     {
  //       name: 'Ho Chi Minh City',
  //       code: 'HCM.CTY',
  //       checked: false,
  //       expand: false
  //     },
  //     {
  //       name: 'Da Nang',
  //       code: 'DN',
  //       checked: false,
  //       expand: false
  //     },
  //     {
  //       name: 'Ha Noi',
  //       code: 'HN',
  //       checked: false,
  //       expand: false
  //     },
  //     {
  //       name: 'Hai Phong',
  //       code: 'HP',
  //       checked: false,
  //       expand: false
  //     }
  //   ];
    
    
  //   return data;
  // }

  constructor(private formBuilder: FormBuilder, private store: Store) {

  }

  ngOnInit(): void {
    this.cities$.subscribe(cities => {
     this.data = cities;
   });
   
    this.settingForm = this.formBuilder.group({
      bordered: false,
      loading: false,
      pagination: true,
      sizeChanger: false,
      title: true,
      header: true,
      footer: true,
      expandable: true,
      checkbox: true,
      fixHeader: false,
      noResult: false,
      ellipsis: false,
      simple: false,
      size: 'small',
      paginationType: 'default',
      tableScroll: 'unset',
      tableLayout: 'auto',
      position: 'bottom'
    });
    this.settingValue = this.settingForm.value;
    this.settingForm.valueChanges.subscribe(value => (this.settingValue = value));
    this.settingForm.get('tableScroll')!.valueChanges.subscribe(scroll => {
      this.fixedColumn = scroll === 'fixed';
      this.scrollX = scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
    });
    this.settingForm.get('fixHeader')!.valueChanges.subscribe(fixed => {
      this.scrollY = fixed ? '240px' : null;
    });
    this.settingForm.get('noResult')!.valueChanges.subscribe(empty => {
      if (empty) {
        this.listOfData = [];
      } else {
        // this.listOfData = this.generateData();
      }
    });
    // this.listOfData = this.generateData();
  }
}
