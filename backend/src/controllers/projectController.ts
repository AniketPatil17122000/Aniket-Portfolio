import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Project from "../models/Project";


export const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const project = await Project.create(req.body)
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            status: res.statusCode,
            data: project
,
        })
    } catch (error) {
        next(error);
    }
}

export const getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
            status :res.status
            
        });
    } catch (error) {
        next(error);
    }
}

export const getProjectsById = async(
     req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
            const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }
        const project = await Project.findById(id);
          if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
  res.status(200).json({
      success: true,
      data: project,
    });


    }catch (error) {
    next(error);
  }
}

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};