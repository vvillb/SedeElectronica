var futufirma = new Object();
var futufirmafactoria = new Object();

futufirma.version = function () {
    futufirma.privateComando = "COMVER";
    futufirma.privateArchivos = null;
    futufirma.privateLanzarAplicacion();
};

futufirma.autenticar = function () {
    futufirma.privateComando = "COMAUT";
    futufirma.privateArchivos = null;
    futufirma.privateLanzarAplicacion();
};

futufirma.firmar = function (archivos, nombreAplicacion, previsualizar, huellaDigitalCertificado, incrustarOCSP) {
    futufirma.privateComando = "COMFIR";
    futufirma.privateArchivos = archivos;
    futufirma.privateComponerParametrosFirma(nombreAplicacion, previsualizar, huellaDigitalCertificado, null, incrustarOCSP);
    futufirma.privateLanzarAplicacion();
};

futufirma.firmarExterna = function (archivos, huellaDigitalCertificado, incrustarOCSP) {
    futufirma.privateComando = "COMFIREX";
    futufirma.privateArchivos = archivos;
    futufirma.privateComponerParametrosFirma(null, false, huellaDigitalCertificado, null, incrustarOCSP);
    futufirma.privateLanzarAplicacion();
};

futufirma.seleccionarYFirmar = function (nombreAplicacion, previsualizar, huellaDigitalCertificado, naturalezas, incrustarOCSP) {
    futufirma.privateComando = "COMSELYFIR";
    futufirma.privateArchivos = null;
    futufirma.privateComponerParametrosFirma(nombreAplicacion, previsualizar, huellaDigitalCertificado, naturalezas, incrustarOCSP);
    futufirma.privateLanzarAplicacion();
};

futufirma.versionFutufirmaValida = function (versionInstalada, versionRequerida) {
    var partesInstalada = versionInstalada.split(".");
    var partesRequerida = versionRequerida.split(".");

    return partesInstalada.length === 3 && partesRequerida.length === 3 && partesInstalada[0] === partesRequerida[0] && partesInstalada[1] === partesRequerida[1] && partesInstalada[2] >= partesRequerida[2];
};

futufirma.onRespuesta = null;
futufirma.onError = null;
futufirma.onErrorConfiguracion = null;
futufirma.onConexionAbierta = null;
futufirma.onConexionCerrada = null;
futufirma.onAplicacionNoInstalada = null;
futufirma.naturalezasDocumentos = null;
futufirma.emisoresReconocidos = null;
futufirma.parametrosFirma = null;
futufirma.debug = false;
futufirma.valorDefectoIncrustarOCSP = 2; //0: NO_INCRUSTAR, 1: INCRUSTAR, 2: INCRUSTAR_SI_NO_ERROR

futufirma.privateComponerParametrosFirma = function (nombreAplicacion, previsualizar, huellaDigitalCertificado, naturalezas, incrustarOCSP) {
    if (nombreAplicacion != null || huellaDigitalCertificado != null || naturalezas != null) {
        futufirma.parametrosFirma = new Object();
        futufirma.parametrosFirma.nombreAplicacion = nombreAplicacion;
        futufirma.parametrosFirma.previsualizar = previsualizar == null ? false : previsualizar;
        futufirma.parametrosFirma.huellaDigitalCertificado = huellaDigitalCertificado;
        futufirma.parametrosFirma.naturalezas = naturalezas;
        futufirma.parametrosFirma.incrustarOCSP = incrustarOCSP != undefined ? incrustarOCSP : futufirma.valorDefectoIncrustarOCSP;
    }
};

futufirma.privateLanzarAplicacion = function () {
    futufirma.privateGUID = futufirma.privateGenerarUUID();
    futufirma.privatePuerto = futufirma.privateGenerarPuerto();
    var parametros = { guid: futufirma.privateGUID, puerto: futufirma.privatePuerto, emisoresReconocidos: futufirma.emisoresReconocidos };
    if (futufirma.debug)
        parametros.flag = "debug";
    var uri = "futufirma://" + encodeURIComponent(JSON.stringify(parametros));
    document.getElementById('futufirmaloader').src = uri;

    futufirma.privateFechaLanzamiento = Date.now();
    setTimeout(function () {
        futufirma.privateInicializarConexion(futufirma.privatePuerto);
    }, 3000);
};

futufirma.privateGenerarUUID = function() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

futufirma.privateGenerarPuerto = function () {
    return 10200 + Math.floor((Math.random() * 500));
};

futufirma.privateInicializarConexion = function (puerto) {
    if (!futufirma.privateComprobarTimeoutNoInstalado()) {
        try {
            futufirma.privateInicializarSocket(puerto);
            //Salvaguarda necesaria para Firefox, que no suele conectar a la primera.
            futufirma.timer = setTimeout(function () {
                if (futufirma.privatesocket === null || futufirma.privatesocket.readyState !== futufirma.privatesocket.OPEN)
                    futufirma.privateInicializarConexion(puerto);
            }, 5000);
        }
        catch (e) {
            futufirma.privatePararTimerInicializacionConexion();
            if (futufirma.onErrorConfiguracion != null)
                futufirma.onErrorConfiguracion();
        }
    }
};

futufirma.privatePararTimerInicializacionConexion = function () {
    if (futufirma.timer != null) {
        clearTimeout(futufirma.timer);
        futufirma.timer = null;
    }
};

futufirma.privateCerrarSocket = function () {
    if (futufirma.privatesocket != null) {
        //Se quitan los eventos para que lo elimine correctamente
        futufirma.privatesocket.onopen = null;
        futufirma.privatesocket.onclose = null;
        futufirma.privatesocket.onerror = null;
        futufirma.privatesocket.onmessage = null;
        futufirma.privatesocket.close();
        futufirma.privatesocket = null;
    }
};

futufirma.privateComprobarTimeoutNoInstalado = function () {
    if ((Date.now() - futufirma.privateFechaLanzamiento) > 25000) {
        futufirma.privatePararTimerInicializacionConexion();
        futufirma.privateCerrarSocket();
        if (futufirma.onAplicacionNoInstalada != null)
            futufirma.onAplicacionNoInstalada();
        return true;
    }
    else
        return false;
};

futufirma.privateInicializarSocket = function (puerto) {
    futufirma.privateConectado = false;
    futufirma.privateCerrarSocket();
    futufirma.privatesocket = new WebSocket('wss://localhost:' + puerto.toString() + '/');
    futufirma.privatesocket.onopen = function () {
        futufirma.privateConectado = true;
        clearTimeout(futufirma.timer);
        futufirma.privateEnviarComando(futufirma.privatesocket, futufirma.privateGUID, futufirma.privateComando, futufirma.privateArchivos, futufirma.parametrosFirma);
        if (futufirma.onConexionAbierta != null)
            futufirma.onConexionAbierta();
    };

    futufirma.privatesocket.onerror = function (evt) {
        if (futufirma.privateConectado && futufirma.onError != null) {
            futufirma.onError();
        }
    };

    futufirma.privatesocket.onclose = function (evt) {
        if (!futufirma.privateConectado) {
            if (!futufirma.privateComprobarTimeoutNoInstalado())
                futufirma.privateInicializarConexion(futufirma.privatePuerto);
        }
        else {
            futufirma.privateCerrarSocket();
            if (futufirma.onConexionCerrada != null)
                futufirma.onConexionCerrada();
        }
    };

    futufirma.privatesocket.onmessage = function (mensaje) {
        if (futufirma.onRespuesta != null)
            futufirma.onRespuesta(JSON.parse(mensaje.data));
        futufirma.privateCerrarSocket();
    };
};

futufirma.privateEnviarComando = function (socket, guid, comando, archivos, parametrosFirma) {
    var mensaje = new Object();
    mensaje.guid = guid;
    mensaje.comando = comando;
    mensaje.archivos = archivos;
    mensaje.parametrosFirma = parametrosFirma;
    socket.send(JSON.stringify(mensaje));
};

futufirmafactoria.crearNaturaleza = function (id, nombre) {
    var naturaleza = { id: id, nombre: nombre };
    return naturaleza;
};

export default futufirma;

