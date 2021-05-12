import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;

let carsRepository: CarsRepositoryInMemory;

let usersRepository: UsersRepositoryInMemory;

let rentalsRepository: RentalsRepositoryInMemory;

const mockCar = {
  name: 'Car Name',

  description: 'Description',

  daily_rate: 100,

  license_plate: 'ABC-1234',

  fine_amount: 60,

  brand: 'Brand',

  category_id: 'Category',
};

const mockUser = {
  name: 'Iago',

  email: 'iagocesar.sgs@gmail.com',

  password: '1234',

  driver_license: '123456',
};

describe('Create Rental Use Case', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();

    usersRepository = new UsersRepositoryInMemory();

    rentalsRepository = new RentalsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,

      carsRepository,

      usersRepository,
    );
  });

  it('Should be able to create a new rental', async () => {
    const user = await usersRepository.create(mockUser);

    const car = await carsRepository.create(mockCar);

    const rental = await createRentalUseCase.execute({
      user_id: user.id,

      car_id: car.id,

      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
  });
});
