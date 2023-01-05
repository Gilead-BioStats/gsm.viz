import Button from '@mui/material/Button';


// TODO: on KRI change current state of y-axis and threshold toggle are not effected
const DownloadChart = ({instance}) => {

    return (
        <Button variant="outlined">
        <a
            href={instance?.toBase64Image()}
            download={'barchart.png'}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            Download
        </a>
    </Button>
    );
};

export default DownloadChart;
