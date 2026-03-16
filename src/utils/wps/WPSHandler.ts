import * as DocHandler from './DocHandler';
import * as PdfHandler from './PDFHandler';

// 这个文件里所有导出方法的第一个参数 Application 不需要在使用的时候传递

export async function locate(Application: any, ...args: any[]) {
  const handler = Application.ActiveDocument ? DocHandler : PdfHandler;
  handler.locate(Application, ...args);
}

export async function accept(Application: any, ...args: any[]) {
  const handler = Application.ActiveDocument ? DocHandler : PdfHandler;
  handler.accept(Application, ...args);
}

export async function reject(Application: any, ...args: any[]) {
  const handler = Application.ActiveDocument ? DocHandler : PdfHandler;
  handler.reject(Application, ...args);
}
