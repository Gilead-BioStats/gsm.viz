import { Tooltip } from 'antd';

export default function headerTooltip(data) {
    return <Tooltip placement='left' title={
      <div className='align'>
        {data.kri_name ? <p>{data.kri_name}</p> : ''}
      </div>}>
      {data.kri_acronym}
    </Tooltip>;
}

