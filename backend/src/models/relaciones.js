import { Usuario } from "./Usuario.js";
import { Local } from "./Local.js";
import { Evento } from "./Evento.js";
import { Asistencia } from "./Asistencia.js";

// Relaciones
Usuario.hasMany(Local);
Local.belongsTo(Usuario);

Local.hasMany(Evento);
Evento.belongsTo(Local);

Usuario.belongsToMany(Evento, { through: Asistencia });
Evento.belongsToMany(Usuario, { through: Asistencia });

export { Usuario, Local, Evento, Asistencia };
