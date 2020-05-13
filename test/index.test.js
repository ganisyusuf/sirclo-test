const request = require('supertest')
const { base} = require('../config/config')

describe('API Test endpoints', () => {
 
    test('Should return 200 when fetch home page', done => {
        
        request(base).get("")
            .then(res => {
                expect(res.statusCode).toEqual(200)
                done()
            })
    })
    
    test('Should return 4XX when fetch data is unauthorized', done => {

        request(base).get("data")
            .then(res => {
                expect(res.statusCode).toBeGreaterThanOrEqual(300)
                expect(res.statusCode).toBeLessThan(400)
                done()
            })
    });

    test('Should return 200 when unauthorized', done => {
        
        request(base).get("login")
            .then(res => {
                expect(res.statusCode).toEqual(200)
                done()
            })
    })

    test("Should return 4XX when credential invalid", done => {
        
        request(base).post("login")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('username=root&password=root12342')
            .then(res => {
                expect(res.statusCode).toEqual(401)
                done()
            })
       
    })

    
    test('Should return 3XX when credential valid', done => {
        
        request(base).post("login")
            // .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('username=root&password=root123')
            .then(res => {
                expect(res.statusCode).toBeGreaterThanOrEqual(300)
                expect(res.statusCode).toBeLessThan(400)
                done()
            })
       
    });

    test('Should return 3XX when authorized', done => {
        
        request(base).get("login")
            .then(res => {
                expect(res.statusCode).toBeGreaterThanOrEqual(300)
                expect(res.statusCode).toBeLessThan(400)
                done()
            })
    })

    test('Should return 200 when fetch data is authorized', done => {

        request(base).get("data")
            .then(res => {
                expect(res.statusCode).toEqual(200)
                done()
            })
    });

    test('Should return 4XX when fetch timestamp start > end', done => {
        
        request(base).post("filter")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('start=2018-07-15&end=2018-07-10')
            .then(res => {
                expect(res.statusCode).toEqual(405)
                // console.log(res.statusCode)
                done()
            })

    });
    
    test('Should return 3XX when fetch timestamp start < end', done => {
        
        request(base).post("/filter")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('start=2018-07-8&end=2018-07-10')
            .then(res => {
                expect(res.statusCode).toBeGreaterThanOrEqual(300)
                expect(res.statusCode).toBeLessThan(400)
                done()
            })
    });
    
    test('Logout should return 3XX when authorized', done => {
        request(base).post("logout")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('session_id=root')
            .then(res => {
                expect(res.statusCode).toEqual(302)
                done()
            })
        
        // console.log(res.statusCode)
    })
    
})

