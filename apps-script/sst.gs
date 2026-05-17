// JCAG S.A.S — Google Apps Script para formularios SST
//
// INSTRUCCIONES DE INSTALACIÓN:
// 1. Ve a https://script.google.com y crea un nuevo proyecto
// 2. Pega este código reemplazando el contenido existente
// 3. Crea un Google Sheet vacío en Drive y copia su ID de la URL
//    (la parte entre /d/ y /edit en la URL del sheet)
// 4. Crea una carpeta en Drive para las firmas y copia su ID
//    (la parte de la URL después de /folders/)
// 5. En el script: click en Proyecto > Propiedades del proyecto > Propiedades de script
//    Añade: SPREADSHEET_ID = <id del sheet> | FOLDER_ID = <id de la carpeta>
// 6. Click en Implementar > Nueva implementación
//    - Tipo: Aplicación web
//    - Ejecutar como: Yo
//    - Quién tiene acceso: Cualquier usuario
// 7. Copia la URL de implementación y agrégala a .env.local:
//    APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Obtener el spreadsheet
    var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName('Registros SST');

    // Crear hoja si no existe y agregar encabezados
    if (!sheet) {
      sheet = ss.insertSheet('Registros SST');
      sheet.appendRow([
        'Fecha', 'Tipo Formulario', 'Nombre', 'Cédula',
        'Cargo', 'Empresa', 'Firma (URL)'
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0f172a').setFontColor('#ffffff');
    }

    // Guardar imagen de firma en Drive
    var folderId = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');
    var folder = DriveApp.getFolderById(folderId);

    // Crear subcarpeta por año/mes
    var now = new Date();
    var yearFolder = getOrCreateFolder(folder, String(now.getFullYear()));
    var monthFolder = getOrCreateFolder(yearFolder, lpad(now.getMonth() + 1) + '_' + getMonthName(now.getMonth()));
    var typeFolder = getOrCreateFolder(monthFolder, data.tipoFormulario);

    // Decodificar y guardar firma
    var sigBase64 = data.firma.replace('data:image/png;base64,', '');
    var sigBlob = Utilities.newBlob(
      Utilities.base64Decode(sigBase64),
      'image/png',
      'firma_' + data.cedula + '_' + data.fecha.replace(/\//g, '-') + '.png'
    );
    var sigFile = typeFolder.createFile(sigBlob);
    sigFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Agregar fila al sheet
    sheet.appendRow([
      data.fecha,
      data.tipoFormulario,
      data.nombre,
      data.cedula,
      data.cargo,
      data.empresa || 'JCAG S.A.S',
      sigFile.getUrl()
    ]);

    // Auto-ajustar columnas
    sheet.autoResizeColumns(1, 7);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Formulario registrado exitosamente' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(parent, name) {
  var folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

function lpad(n) {
  return n < 10 ? '0' + n : String(n);
}

function getMonthName(monthIndex) {
  var names = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return names[monthIndex];
}

// Función de prueba — ejecutar manualmente para verificar conexión
function testSetup() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var folderId = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');
  Logger.log('SPREADSHEET_ID: ' + (spreadsheetId ? 'OK ✓' : 'NO CONFIGURADO ✗'));
  Logger.log('FOLDER_ID: ' + (folderId ? 'OK ✓' : 'NO CONFIGURADO ✗'));
}
