async function sameUser(req, res, next){
    try{
        const userIdSolicitante = req.user.id;
        const userIdInscripcion = req.body.userId;

        if (userIdSolicitante === userIdInscripcion){
            next();
        } else {
            return respondError(req, res, 401, 'No tienes permiso para modificar la inscripción de otro usuario.');
        };
    }
} catch (error) {
    handleError (error, "authorization.middleware -> sameUser");
}
