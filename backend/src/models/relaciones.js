import { Usuario } from "./Usuario.js";
import { Local } from "./Local.js";
import { Evento } from "./Evento.js";
import { Asistencia } from "./Asistencia.js";

// Relaciones
Usuario.hasMany(Local);
Local.belongsTo(Usuario);

Local.hasMany(Evento);
Evento.belongsTo(Local);

// Relaciones para Asistencia: belongsTo son necesarios para que include funcione
Asistencia.belongsTo(Usuario, { foreignKey: "UsuarioId" });
Asistencia.belongsTo(Evento, { foreignKey: "EventoId" });

// Relación muchos-a-muchos (sin duplicar hasMany/belongsToMany)
Usuario.belongsToMany(Evento, { through: Asistencia, foreignKey: "UsuarioId", otherKey: "EventoId" });
Evento.belongsToMany(Usuario, { through: Asistencia, foreignKey: "EventoId", otherKey: "UsuarioId" });

export { Usuario, Local, Evento, Asistencia };
