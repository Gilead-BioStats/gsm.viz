  export default function flagStatusIcon(data, obj) {
    switch (data) {
      case 2:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <img alt="" src={doubleDownArrow} />
          </Tooltip>
        )
        break;
      case 1:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <img alt="" src={singleArrow} />
          </Tooltip>
        )
        break;
      case 0:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <CheckOutlined style={{ color: '#3aaf00' }} />
          </Tooltip>
        )
        break;
      case -1:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <img alt="" src={singleArrow} className="flag-icon-rotate" />
          </Tooltip>
        )
        break;
      case -2:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <img alt="" src={doubleDownArrow} className="flag-icon-rotate" />
          </Tooltip>
        )
        break;
      default:
        return (
          <Tooltip placement='bottom' title={obj ? 
            <div className='align'>
              {obj.no_of_consecutive_loads ? <p>No consecutive loads: {obj.no_of_consecutive_loads}</p> : ''}
              {obj.flag_value ? <p>Flag value: {obj.flag_value}</p> : <p>Flag value: {data}</p>}
              {obj.selected_snapshot_kri_value ? <p>Snapshot kri: {obj.selected_snapshot_kri_value}</p> : ''}
            </div> : ''}>
            <MinusOutlined />
          </Tooltip>
        )
        break;
    };
  }
