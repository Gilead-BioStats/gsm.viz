export default function singleArrow(flag, color = 'white') {
    const direction = Math.sign(flag) === 1 ? 'up' : 'down';

    const svgIcon = `
        <svg aria-hidden="true" role="img" viewBox="0 0 448 512" style="height:1em;width:0.88em;vertical-align:-0.125em;margin-left:auto;margin-right:auto;font-size:inherit;fill:${color};overflow:visible;position:relative;${
        direction === 'down' ? 'transform:rotate(180deg);' : ''
    }">
            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
        </svg>`;

    return svgIcon;
}
