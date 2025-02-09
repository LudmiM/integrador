const db = require("../../database/models");

module.exports = async (req, res) => {
    const skills = await db.Skill.findAll({});
    const knowledge = await db.Knowledge.findAll({});
    const specialty = await db.Specialty.findAll({});
    const idProject = +req.params.id;
    const individuals = await db.Individual.findAll({
        where: {
            idProject: idProject
        },
        include: [{
            model: db.Skill,
            as: 'skills',
            through: {
                attributes: [] 
            },
            attributes: ['id','name']
        }]
    });
    res.render('products/table-for-ind', {skills,knowledge,specialty,individuals,idProject})
}