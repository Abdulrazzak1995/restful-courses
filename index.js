const Joi = require('joi');
const express = require('express');
const app =express();

app.use(express.json());

const courses = [
{id: 1, name: 'course1'},
{id: 2, name: 'course2'},
{id: 3, name: 'course3'},


];

app.get('/', (req, res)=>{
res.send('Hello Word !!!');

});

app.get('/api/courses' ,(req ,res)=> {
res.send(courses);

});

app.post('/api/courses', (req, res) =>{

    const { error} = validateCourse(req.body); // result .error

    // Validation
    // if invalid , return 400 - Bad request
            if(error) return res.status(400).send(result.error.details[0].message);

                // 400 Bad Request
            return ;

const course ={
id: courses.length + 1,
name: req.body.name
};
courses.push(course);
res.send(course);
});

app.put ('/api/courses/:id ' , (req, res) => {
// Look up the course
//if not existing , return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) return  res.status(404).send('The course with the given ID was not found ');
     
const { error} = validateCourse(req.body); // result .error

// Validation
// if invalid , return 400 - Bad request
// 400 Bad Request
  if(error) return res.status(400).send(result.error.details[0].message);

            
      
        
//Update cours
course.name = req.body.name;
//Return the update course
res.send(course);
});

app.delete('/api/courses/:id' , (req, res)=>{

    //Look up the course
    //Not exsiting , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) return res.status(404).send('The course with the given ID was not found ')

    //Delete
const index = courses.indexOf(course);
courses.splice(index, 1);
res.send(course);
    //Return the sam
});




function validateCourse(course){

    const schema ={
        name: Joi.string().min(3).required()
            };
            return  joi.validate(course , schema);
}


app.get('/api/posts/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found ')
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}..'));