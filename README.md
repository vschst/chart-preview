### Chart preview

> Node.js application to generate standalone PNG images for chart preview of data source

### Installation

##### Requirments
Make sure you have [Node.js](https://nodejs.org) installed and package manager [NPM](https://www.npmjs.com/) (which is included in the node distribution).

If you are using Ubuntu or Debian, these commands will install the last Node.js version respectively:
```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
````

##### Installation and build setup
###### Copying project files
Clone this repository into your `/var/www` directory:
```bash
git clone https://github.com/victor192/chart-preview.git
```

###### Install dependencies
```bash
cd chart-preview
npm install
```

###### Launch settings
This app listens on default port **3000** for connections.
To change the port, open the file [index.js](index.js) where you will see the line
```js
const port = 3000
```
You can change the value of the `port` variable to your own.

By default, the app updates charts every 30 minutes.
To do this, we uses the [node-cron](https://www.npmjs.com/package/node-cron) task scheduler.
To change cron syntax, in the [index.js](index.js) file find
```js
const task = cron.schedule('0 */30 * * * *', async () => {
    
})
```
You can change the value `'0 */30 * * * *'` to your own according to the [settings](https://www.npmjs.com/package/node-cron#allowed-fields).

###### Test run command
```bash
npm start
```
Sample url for png file: `https://<your-host>:3000/<chart-name>.png`, where `<your-host>` and `<chart-name>` there are server host and config name of chart.

###### Terminate process
Run `killall -9 node` or `pkill -f node`

###### Start application to background
Install latest version of production process manager [PM2](http://pm2.keymetrics.io/):
```bash
npm install pm2 -g
```
Next, run command:
```bash
cd chart-preview
pm2 start npm --name "chart-preview" -- start
```
After that, process will run in the background. If you want to delete the app from the PM2 process list. You just have to enter the following command: `pm2 delete chart-preview`.

### Data source for charts
Supported data formats: CSV, CSV and JSON.
The data source structure for charts should be an JavaScript Array and look something like this:
```js
[
    {
        name: "abc",
        value1: 123,
        value2: 321.789
    }, 
    {
        name: "def",
        value1: 789.012,
        value2: 456
    }
]
```

By default, the first key value from the array is taken as the argument for the chart (along the x axis), and the second is taken for the value (along the y axis):
```js
const keys = Object.keys(d)   //  d - is a data item
const source = {
    argument: d[keys[0]],   //  argument is a d.name
    value: d[keys[1]]   //  value is a d.value1
}
```
However, you can customize the data selection using the accessor function (See chart configuration below).

### Charts configuration
You can customize the graphics in the file [names.js](charts/names.js).
Its structure is an associative array of objects:
```js
module.exports = {
    ['<chart-name>']: {
        //  Chart configuration options
    }
}
```
where `<chart-name>` this is the name of the chart, which should be unique.

###### Configuration options
- **url** `string` 

Chart data source URL.

- **format** `string`

Data source format. Possible values: `csv`, `tsv` or `json`.

- **accessor** `Function`

Optional configuration to pick data from data item.
Must be a function that returns a object with keys `argument` and `value`.
Example: 
```js
accessor: d => ({argument: d.name, value: d.value1})
```

- **prepare** `Function`

Optional configuration to prepare a value after it is read from the data source.
Must be a function. Example:
```js
prepare: d => Number(d) / 86400
```

- **type** `string`

Chart type. It can take the following values:
   1. **`line`** - to draw a linear chart
   2. **`line_acc`** - to draw a linear chart with value accumulation
   3. **`scatter`** - to draw a scatter chart
   4. **`bar`** - to draw a bar chart
   5. **`bar_acc`** - to draw a bar chart with value accumulation
   6. **`pie`** - to draw a pie chart
   
- **options** `Object`

Optional configuration for setting chart drawing options.
Must be an object with the following attributes: `color` - color in hex format of the chart line (works for all charts except pie chart), `colors` - array of colors in hex format to fill slices of pie chart (only for pie chart).

# License
Copyright (c) 2019, Viktor Schastnyy.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.