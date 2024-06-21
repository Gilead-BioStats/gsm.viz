export default function singleArrow(flag, color = 'white') {
    const direction = Math.sign(flag) === 1 ? 'up' : 'down';

    return [
        `<svg ${
            direction === 'down' ? 'style="transform:rotate(180deg)"' : ''
        } width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">`,
        `<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5857 11.4447C12.9763 11.8353 13.5303 11.9144 13.8232 11.6215C14.1161 11.3286 14.0369 10.7746 13.6464 10.3841L10.818 7.55565C10.5746 7.31232 10.2678 7.18988 10.0003 7.20299C9.73263 7.18973 9.42564 7.31217 9.18218 7.55563L6.35376 10.3841C5.96323 10.7746 5.88409 11.3286 6.17698 11.6215C6.46987 11.9144 7.02389 11.8352 7.41442 11.4447L10.0001 8.85907L12.5857 11.4447Z" fill="${color}"/>`,
        `<rect x="10" y="19.2929" width="13.1421" height="13.1421" rx="1.5" transform="rotate(-135 10 19.2929)" stroke="${color}"/>`,
        `</svg>`,
    ].join('');
}
