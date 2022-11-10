# rbm-viz
[rbm-viz](https://github.com/Gilead-BioStats/rbm-viz/) is a data visualization library built with [Chart.js](https://www.chartjs.org/) that features charts adapted for [risk-based monitoring](https://www.fda.gov/media/121479/download) in clinical trials.

## Examples
- [scatter plot](https://fluffy-disco-22959532.pages.github.io/examples/scatterPlot/)
- [bar chart](https://fluffy-disco-22959532.pages.github.io/examples/barChart/)
- [sparkline](https://fluffy-disco-22959532.pages.github.io/examples/sparkline/)
- [time series (continuous outcome)](https://fluffy-disco-22959532.pages.github.io/examples/distributionOverTime/)
- [time series (discrete outcome)](https://fluffy-disco-22959532.pages.github.io/examples/timeSeries/)

## Installation
`rbm-viz` is hosted on GitHub and accessible with `npm`:

```
npm install git+https://github.com/Gilead-BioStats/rbm-viz.git
```

## Development
Clone `rbm-viz` with `git` and install its dependencies:

```
git clone https://github.com/Gilead-BioStats/rbm-viz.git
cd rbm-viz
npm install
```

Development branches should resolve a specific issue and be named accordingly.  For instance, branch `fix-123` should resolve issue #123 on GitHub:

```
git checkout -b fix-123
```

The codebase is comprised of files under `./src`.  Each file should generally contain a single function, or module.  Upon updating a file, the library needs to be re-bundled:

```
npm run bundle
```

Upon completion of the update to the codebase, rebuild the library and push your branch to GitHub:

```
npm run build
git add -A
git commit -a -m 'fix #123'
git push -u origin fix-123
```

On GitHub, open a [pull request](https://github.com/Gilead-BioStats/rbm-viz/pulls) with `fix-123` as the source and `dev` as the target.  The pull request requires a code review prior to merging.
