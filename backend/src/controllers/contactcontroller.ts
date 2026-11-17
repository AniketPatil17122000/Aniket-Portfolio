import { Request, Response, NextFunction } from "express";
import Contact from "../models/Contact";
import { sendContactNotification } from "../services/emailService";

export const createContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contact = await Contact.create(req.body)
           try {
            await sendContactNotification({
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message
            });
        } catch (emailError) {
            console.error("Contact notification email failed:", emailError);
        }
        return res.status(201).json({
            success: true,
            status: 201,
            message: "Contact message submitted successfully",
            data: contact
        });

    } catch (error) {
        next(error);
    }
}

export const getAllContacts = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const contact = await Contact.find().sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Contact messages fetched successfully",
            data: contact
        });
    } catch (error) {
        next(error);
    }

}

export const getContactById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Contact message not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Contact message fetched successfully",
            data: contact
        });
    } catch (error) {
        next(error);
    }
};

// Update contact message status (Admin only)
export const updateContactStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Contact message not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Contact status updated successfully",
            data: contact
        });

    } catch (error) {
        next(error);
    }
};

// Delete contact message (Admin only)
export const deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Contact message not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Contact message deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};