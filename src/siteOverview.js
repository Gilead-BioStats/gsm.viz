import Parser from 'html-react-parser';

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

const defineColumns = function(kriObj) {
    const columns = [
      {
        header: "Site ID",
        accessorKey: "site_data",
        cell: (props) => 
          Parser(`
            <div style={{ display: 'grid' }} className="tooltip">
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
                <Link to=${props.getValue().site_id} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold', textDecoration: 'underline' }}>
                  ${props.getValue().site_id}
                  <InfoCircleOutlined style={{ color: '#3c587f', cursor: 'help', fontSize: '12px', marginLeft: '2px' }} />
                </Link>
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

  const siteOverview = {
    makeSiteSummaryData,
    defineColumns
  };

export default siteOverview;
