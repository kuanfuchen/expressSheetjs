const XLSX = require("xlsx"); 
const Transform = require("stream").Transform;
const ExcelJS = require('exceljs');
// const resolveXlsx = async(file)=>{
//   // const wb = await XLSX.read(file, {dense: true, sheetStubs:true});
//   // const name = await wb.SheetNames[0];
//   // console.log(name, 'name');
//   // const ws = await wb.Sheets[name];
//   // return {data: ws}
//   // 
//   // const wb = await XLSX.readFile(file, {dense: true, sheetStubs:true});
//   // const name = await wb.SheetNames[0];
//   // console.log(name, 'name');
//   // const ws = await wb.Sheets[name];
//   // return {data: ws}
//   // 

//   // 
//   const stream = await XLSX.stream.to_json({raw: true,defval:''});
//   stream.on('data',(data, rowNumber)=>{
//     console.log(data)
//   })
//   stream.on('close', () => console.log('CLOSE'));
//   stream.on('end',()=>{
//     console.log('end')
//   });
//   // const wb =XLSX.stream(file).pipe(stream);
//   // console.log(wb)

//   // const conv = new Transform({writableObjectMode:true});
//   // conv._transform = function(obj, e, cb){ cb(null, JSON.stringify(obj) + "\n"); };
//   // const xlsxData = await XLSX.stream.to_json(ws, {raw: false}).pipe(conv).pipe(process.stdout);
//   // console.log(xlsxData)
//   // return xlsxData
// }
const options = {
  // sharedStrings: 'emit',
  // hyperlinks: 'emit',
  sharedStrings: 'cache',
  hyperlinks: 'cache',
  worksheets: 'emit',
  styles: 'cache',
};
const handleReadExcel = async(file)=>{
  const name = file.originalname;
  const timeStart = Date.now()
  const data = [];
  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(name, options);
  
  for await (const worksheetReader of workbookReader) {
      for await (const row of worksheetReader) {
        console.log("Raw text:\n" + row.values)
        data.push("Raw text:\n" + row.values)
      }
  }
  return data
  // 
  // const data = [];
  // const stream = file.stream();
  // const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader();
  
  // console.log(stream,'stream')
  // stream.pipe(workbookReader);
  // for await (const worksheetReader of workbookReader) {
  //     for await (const row of worksheetReader) {
  //       console.log("Raw text:\n" + row.values)
  //       data.push("Raw text:\n" + row.values)
  //     }
  // }
  // return data
  // const timeEnd = Date.now()
  // console.log(timeEnd - timeStart, 'now')

  // 
  // 
  // const workbook = new ExcelJS.stream.xlsx.WorkbookReader(name, options);
  // // workbook.read();
  // const data = [];
  // let cellIndex = 0;
  // for await (const {eventType, value} of workbook.parse()) {
    
  //   switch (eventType) {
  //     case 'worksheet':
  //       console.log(value.workbook.model)
  //       // data.push(`{row${cellIndex}:${value.workbook}}`)
  //       cellIndex ++
  //       // if(cellIndex % 5000 === 0) console.log(cellIndex);
  //       // console.log(value.workbook.sharedStrings)
  //   }
  // }
  // return data
}
const resolveXlsx = async(file)=>{
  const data = await handleReadExcel(file)
  return data;
  // workbook.on('end', async() => {
  //   // console.log(data)
  //   console.log('finish');
  //   return await data
  // });
  // workbook.on('error', (err) => {
  //   console.log(err)
  //   return err
  // });
  //small file
  // console.log(file)
  // const buf = file.buffer;
  // console.log(buf,'buf')
  // const workbook = new ExcelJS.Workbook();
  // await workbook.xlsx.load(buf).then(async()=>{
  //   const workSheet = await workbook.getWorksheet(1);
  //   console.log(workSheet, 'workSheet')
  //   const data = [];
  //   // return await {data:workSheet}
  //   await workSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  //       console.log(`Row ${rowNumber}: ${row.values}`);
  //       const info = `Row ${rowNumber}: ${row.values}`;
  //       data.push(info)
  //   });
  //   // console.log(data)
  //   return data
  // })
}

module.exports = resolveXlsx;