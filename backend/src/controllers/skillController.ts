import { Request, Response, NextFunction } from "express";
import Skill from "../models/Skills";



export const  getAllSlills = async (    _req: Request,
    res: Response,
    next: NextFunction) => {
          try {
        const skills = await Skill.find().sort({ category: 1, name: 1 });

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Skills fetched successfully",
            data: skills
        });
    } catch (error) {
        next(error);
    }

}

export const createSkill = async (
        req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
                const skill = await Skill.create(req.body);
                  return res.status(201).json({
            success: true,
            status: 201,
            message: "Skill created successfully",
            data: skill
        });

    }catch (error) {
        next(error);
    }

}

export const updateSills = async (
        req: Request,
    res: Response,
    next: NextFunction
) => {
try{
            const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

          if (!skill) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Skill not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Skill updated successfully",
            data: skill
        });

}catch (error) {
        next(error);
    }

}

export const deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Skill not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Skill deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
