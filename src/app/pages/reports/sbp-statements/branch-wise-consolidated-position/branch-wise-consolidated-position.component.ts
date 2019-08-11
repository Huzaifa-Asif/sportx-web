import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-branch-wise-consolidated-position',
  templateUrl: './branch-wise-consolidated-position.component.html',
  styleUrls: ['./branch-wise-consolidated-position.component.scss']
})
export class BranchWiseConsolidatedPositionComponent implements OnInit {

  isRequested = true;
  submitted = false;

  format: any = 'pdf';
  dateTo: any = '';
  dateFrom: any = '';

  constructor(private api: RestApiService, private helper: HelperService) { }

  ngOnInit() {
  }

  getReport() {

    this.submitted = true;

    if (this.format !== '' && this.dateTo !== '' && this.dateFrom !== '') {

      const tempDateTo = new Date(this.dateTo);
      const dateToFormated = tempDateTo.toJSON();

      const tempDateFrom = new Date(this.dateFrom);
      const dateFromFormated = tempDateFrom.toJSON();

      const data = {
        CoName: 'Islamabad Exchange',
        BranchName: 'Head Office',
        FromDate: dateFromFormated,
        ToDate: dateToFormated,
        FileFormat: this.format,
      };

      this._getReport(data);

    }
  }

  _getReport(data) {

    this.isRequested = false;

    this.api.getReport('BrWiseCurrency', data, 'BrWiseCurrency', this.format).then((response: any) => {

      this.isRequested = true;
      // console.log('Success', response);

    }, (error) => {

      this.isRequested = true;
      // console.log('Failure', error);

    });
  }


}