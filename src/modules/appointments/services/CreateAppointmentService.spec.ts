import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '321321',
      provider_id: '124312412412',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('124312412412');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '321321',
      provider_id: '124312412412',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '321321',
        provider_id: '124312412412',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
