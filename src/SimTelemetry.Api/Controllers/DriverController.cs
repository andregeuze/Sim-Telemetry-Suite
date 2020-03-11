using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimTelemetry.Api.Data;
using SimTelemetry.Api.Models;
using System;
using System.Collections.Generic;
using System.Net;

namespace SimTelemetry.Api.Controllers
{
    [Route("api/Driver")]
    public class DriverController : ControllerBase
    {
        private readonly IService<Driver> _driverService;

        public DriverController(IService<Driver> driverService)
        {
            _driverService = driverService;

            // populate the db for testing purposes
            if (_driverService.Get().Count == 0)
            {
                _driverService.Create(new Driver
                {
                    Name = "André Geuze",
                    Laps = new[] {
                        new Lap { Time = 100.238f }
                    }
                });
            }
        }

        [HttpGet]
        public List<Driver> GetAll()
        {
            return _driverService.Get();
        }

        [HttpGet("{name}", Name = "GetByName")]
        public IActionResult GetByName(string name)
        {
            var item = _driverService.Get(name);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        public IActionResult Create([FromBody] Driver driver)
        {
            if (driver == null)
            {
                return BadRequest();
            }

            try
            {
                return Ok(_driverService.Create(driver));
            }
            catch (AggregateException ae)
            {
                return BadRequest(ae);
            }
        }
    }
}
