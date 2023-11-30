import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function defineColumns(kriObj) {
  //Structure for our headers/colums keys
  const columns = [
    {
      header: "Site ID",
      accessorKey: "site_data",
      cell: (props) => (
        <Tooltip placement='right' color='#fff' title={
          <div className='align darkTxt'>
            {props.getValue().site_id ? <p><b>Site ID:</b> {props.getValue().site_id}</p> : ''}
            <hr/>
            {props.getValue().site_name ? <p>Site name: <b>{props.getValue().site_name}</b></p> : ''}
            {props.getValue().city ? <p>City: <b>{props.getValue().city}</b></p> : ''}
            {props.getValue().state ? <p>State: <b>{props.getValue().state}</b></p> : ''}
            {props.getValue().country ? <p>Country: <b>{props.getValue().country}</b></p> : ''}
            {props.getValue().site_status ? <p>Status: <b>{props.getValue().site_status}</b></p> : ''}
            {props.getValue().site_investigator ? <p>Site investigator: <b>{props.getValue().site_investigator}</b></p> : ''}
          </div>
        }>
          <span className='help'>{props.getValue().site_id}</span> <InfoCircleOutlined style={{ color: '#3c587f', cursor: 'help', fontSize: '12px', marginLeft: '2px' }} />
        </Tooltip>
      )
    },
    {
      header: "Enrolled subjects",
      accessorKey: "enrolled_subjects",
    },
    {
      header: "Red KRIs",
      accessorKey: "red_kris",
    },
    {
      header: "Amber KRIs",
      accessorKey: "amber_kris",
    },
    ...kriObj
  ];

    return(columns);
}
