﻿using Hospital_Appointment_Booking_System.Interfaces;
using Hospital_Appointment_Booking_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment_Booking_System.Repositories
{
    public class AvailabilityRepository : IAvailabilityRepository
    {
        readonly Master_Hospital_ManagementContext _dbContext = new();


        public AvailabilityRepository(Master_Hospital_ManagementContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task<Availability> GetById(int id)
        {
            return await _dbContext.Availabilities.FindAsync(id);
        }

        public async Task<List<Availability>> GetAll()
        {
            return await _dbContext.Availabilities.ToListAsync();
        }

        public async Task Add(Availability availability)
        {
            _dbContext.Availabilities.Add(availability);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Availability availability)
        {
            _dbContext.Entry(availability).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Availability availability)
        {
            _dbContext.Availabilities.Remove(availability);
            await _dbContext.SaveChangesAsync();
        }
    }
}