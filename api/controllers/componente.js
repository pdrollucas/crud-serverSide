import { db } from '../db.js'

export const getComponentes = (req, res) => {
    const q = 'SELECT * FROM componentes'

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const addComponente = (req, res) => {
    const q = "INSERT INTO componentes(`nome_componente`, `desc_componente`) VALUES(?)"

    const values = [
        req.body.nome_componente,
        req.body.desc_componente
    ]

    db.query(q, [values], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Componente criado com sucesso!")
    })
}

export const updateComponente = (req, res) => {
    const q = "UPDATE componentes SET `nome_componente` = ?, `desc_componente` = ? WHERE `codigo_componente` = ?"

    const values = [
        req.body.nome_componente,
        req.body.desc_componente
    ]

    db.query(q, [...values, req.params.codigo_componente], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Componente atualizado com sucesso!")
    })
}

export const deleteComponente = (req, res) => {
    const q = "DELETE FROM componentes WHERE `codigo_componente` = ?"

    db.query(q, [req.params.codigo_componente], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Componente deletado com sucesso!")
    })
}