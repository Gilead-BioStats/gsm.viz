import React, { useRef, useEffect } from 'react';
import Parser from 'html-react-parser';
//import InfoCircleOutlined from '../src/assets/info-circle-svg.svg';
//import doubleDownArrow from '../src/assets/doubleDownArrow.svg';
//import singleArrow from '../src/assets/singleArrow.svg';
//import greenCheck from '../src/assets/green-checkmark.webp';
import sparkline from './sparkline';

  const makeSiteSummaryData = function (data) {
      const siteSummaryData = data.site_grid_details
          .filter(d => d.subject_enrolled > 0)
          .map((item) => {
            const obj = {
                site_data: {
                site_id: item.site_id,
                ...item.site_id_details,
                site_investigator: item.site_investigator
                },
                enrolled_subjects: item.subject_enrolled,
                red_kris: item.flagged_kri,
                amber_kris: item.at_risk_kri
            };

            const kriObj = item.kri_column_details.sort((a, b) => Object.keys(a) < Object.keys(b) ? -1 : Object.keys(b) < Object.keys(a) ? 1 : 0).reduce((kriItems, kriItem) => {
                kriItems[Object.keys(kriItem)] = { ...kriItem[Object.keys(kriItem)], site_id: item.site_id };
                return kriItems;
            }, {});

            return { ...obj, ...kriObj };
          });
    return siteSummaryData;
  };

const defineColumns = function(kriObj, study_id) {
    const columns = [
      {
        header: "Site ID",
        accessorKey: "site_data",
        cell: (props) => 
          Parser(`
            <div className="tooltip">
            <div className='align darkTxt tooltiptext'>
                ${
                  props.getValue().site_id ?
                    `<p><b>Site ID:</b> ${props.getValue().site_id}</p>`
                    : ''
                }
                <hr/>
                ${props.getValue().site_name ? `<p>Site name: <b>${props.getValue().site_name}</b></p>` : ''}
                ${props.getValue().city ? `<p>City: <b>${props.getValue().city}</b></p>` : ''}
                ${props.getValue().state ? `<p>State: <b>${props.getValue().state}</b></p>` : ''}
                ${props.getValue().country ? `<p>Country: <b>${props.getValue().country}</b></p>` : ''}
                ${props.getValue().site_status ? `<p>Status: <b>${props.getValue().site_status}</b></p>` : ''}
              </div>
              <span className='help'>
                <a href="/${study_id}/site-summary/${props.getValue().site_id}">
                  ${props.getValue().site_id}
                  <img src=${InfoCircleOutlined} className="info-icon" />
                </a>
              </span>
              <span>${props.getValue().site_investigator?.split(",").shift()}</span>
            </div>`),
      },
      {
        header: "Enrolled subjects",
        accessorKey: "enrolled_subjects"
      },
      {
        header: "Red KRIs",
        accessorKey: "red_kris"
      },
      {
        header: "Amber KRIs",
        accessorKey: "amber_kris"
      },
      ...kriObj
    ];
    return columns;
  };

const headerTooltip = function(data) {
  return Parser(`<div className='tooltip'>
    <div className='tooltiptext header'>
      ${data.kri_name ? `<p>${data.kri_name}</p>` : ''}
    </div>
    ${data.kri_acronym}
  </div>`);
}

const callSparkline = function(obj, kri, sparklineData, sparklineWorkflow,) {
  if(sparklineWorkflow?.[kri.kri_id] !== undefined) {
    sparkline(document.getElementById(`chartContainer${[obj?.site_id]}-${[kri.kri_id]}`), sparklineData?.[obj?.site_id]?.[kri.kri_id], sparklineWorkflow?.[kri.kri_id]);
  }
}

const flagStatusIcon = function(data, obj, sparklineData, sparklineWorkflow, kri) {
  callSparkline(obj, kri, sparklineData, sparklineWorkflow);
  switch (data) {
    case 2:
      return (
        `<div className='tooltip'>
          <div className='tooltiptext'>
            <div>
              ${kri?.kri_name} : Red
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper' id="red">
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <img className='help' alt="" src=${doubleDownArrow} />
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
    case 1:
      return (
        `<div className="tooltip">
          <div className="tooltiptext">
            <div>
              ${kri?.kri_name} : Amber
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper'>
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <img className='help' alt="" src=${singleArrow} />
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
    case 0:
      return (
        `<div className="tooltip">
          <div className="tooltiptext">
            <div>
              ${kri?.kri_name} : Green
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper'>
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <img className='help greencheck' alt="" src=${greenCheck} />
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
    case -1:
      return (
        `<div className="tooltip">
          <div className="tooltiptext">
            <div>
              ${kri?.kri_name} : Amber
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper'>
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <img className='help flag-icon-rotate' alt="" src=${singleArrow} />
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
    case -2:
      return (
        `<div className="tooltip">
          <div className="tooltiptext">
            <div>
              ${kri?.kri_name} : Red
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper'>
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <img className='help flag-icon-rotate' alt="" src=${doubleDownArrow} />
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
    default:
      return (
        `<div className="tooltip">
          <div className="tooltiptext">
            <div>
              ${kri?.kri_name} : NA
            </div>
            <div className='kri-popover-wrap'>
              <div className='kri-metric-value'>KRI Score Sparkline</div>
              <div className='kri-metric-sparkline-wrapper'>
                <div id='chartContainer${[obj?.site_id]}-${[kri.kri_id]}' style="width: 100%;height: 50px"></div>
              </div>
            </div>
          </div>

          <div className="icon-flex">
            <p className='help'><b> - </b></p>
            ${obj?.no_of_consecutive_loads > 0 ? (
              `<span className='kri-badge'>${obj?.no_of_consecutive_loads}</span>`
            ) : ''}
          </div>
        </div>`
      );
  };
}

const defineKriObj = function(data, { sparklineData, sparklineWorkflow }) {
  const kriObj = data.all_kris_list.filter(kri => /^kri/.test(kri.kri_id))
  .map((kri) => (
    {
      header: headerTooltip(kri),
      accessorKey: kri.kri_id,
      cell: (props) => Parser(`<span>${flagStatusIcon(props.getValue()?.flag_value, props.getValue(), sparklineData, sparklineWorkflow, kri)}</span>`),
      sortingFn: (A, B, columnId) => {
        const flagComparison = Math.abs(A.original[columnId].flag_value) - Math.abs(B.original[columnId].flag_value);
        const scoreComparison = Math.abs(A.original[columnId].selected_snapshot_kri_value) - Math.abs(B.original[columnId].selected_snapshot_kri_value);
        return flagComparison || scoreComparison;
      }
    }
  ))
  .sort((a,b) => 
    a.accessorKey < b.accessorKey ? -1 :
    b.accessorKey < a.accessorKey ? 1 : 0 
  );

  return(kriObj);
}

  const siteOverview = {
    makeSiteSummaryData,
    defineColumns,
    headerTooltip,
    defineKriObj,
    flagStatusIcon
  };

export default siteOverview;
