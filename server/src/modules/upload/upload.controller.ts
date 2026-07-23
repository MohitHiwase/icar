import { Request, Response, NextFunction } from 'express';
import { uploadService } from './upload.service';
import { uploadDatasetInputSchema } from './upload.schema';

export async function uploadDatasetHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const validatedInput = uploadDatasetInputSchema.parse(req.body);

    const result = await uploadService.processUpload(req.file, userId, validatedInput);

    res.status(201).json({
      status: 'success',
      message: 'Geospatial file uploaded and dataset created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
