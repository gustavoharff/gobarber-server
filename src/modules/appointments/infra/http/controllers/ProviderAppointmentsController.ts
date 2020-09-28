import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const provider_id = request.user.id;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointmentService.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
