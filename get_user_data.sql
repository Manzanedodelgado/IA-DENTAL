SET NOCOUNT ON;
SELECT IdCli,
    CodCli,
    Nombre,
    Apellidos,
    NIF,
    Direccion,
    CP,
    Tel1,
    Tel2,
    TelMovil,
    Email,
    FecNacim,
    FecAlta,
    IdPoblacio,
    Notas,
    Mailing,
    SISTEMA,
    TARIFA
FROM Clientes
WHERE Apellidos LIKE '%Manzanedo Delgado%'
    OR Nombre LIKE '%Juan Antonio%';