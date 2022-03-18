import Query from '../database/model/query.model';
import { queriesValidation } from '../helpers/validation';

export const saveQuery  = async (req, res) => {
    const {error} = queriesValidation(req.body);
    if(error){
        return res.status(400).json({ status: "fail", message: error.details[0].message})
    }
    const query = req.body;
    const newQuery = new Query(query);
    await newQuery.save();
    res.status(201).json({status: "success", data: newQuery});
}

export const getAllQuery = async (req, res) => {
    const query = await Query.find();
    res.status(200).json({status: "success", data: query})
}

export const getById = async (req, res) => {
    const {id} = req.params;
    const query = await Query.findById(id);
    if(!query) return res.status(404).json({status: "fail", message: "query not found"}) ;
    res.status(200).json({status: "success", data: query});
}

export const deleteQueryById = async(req, res) => {
    const {id} = req.params;
    const query = await Query.findById(id);
    if(!query) return res.status(404).json({status: "fail", message: "Query not found"});
    await Query.findByIdAndDelete(id);
    res.status(200).json({status: "success", message:"Query deleted", data: query});
}
