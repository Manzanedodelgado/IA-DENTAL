SET NOCOUNT ON;
SELECT *
FROM Clientes
WHERE Apellidos LIKE '%Manzanedo Delgado%'
    AND Nombre LIKE '%Juan Antonio%';