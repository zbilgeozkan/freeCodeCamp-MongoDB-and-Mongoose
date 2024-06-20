require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let Bilge = new Person({
    name: 'Bilge',
    age: '22',
    favoriteFoods: ['Pasta']
  })

  Bilge.save((error, data) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, data);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, peopleCreated) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, peopleCreated);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, peopleFound) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, peopleFound);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$all: [food]}}, (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, result);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      result.favoriteFoods.push(foodToAdd);
      result.save((error, updatedResult) => {
        if (error) {
          console.log(error)
        }
        else {
          done(null, updatedResult);
        }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, (error, personFound) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, personFound);
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove((personId), (error, personToRemove) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, personToRemove);
    }
  }) 
};

const removeManyPeople = (done) => {
  const nameToRemove = {name: "Mary"};

  Person.remove((nameToRemove), (error, removeInfo) => {
    if (error) {
      console.log(error);
    }
    else {
      done(null, removeInfo);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec((error, searchResult) => {
    if (error) {
      console.log(searchResult);
    }
    else {
      done(null, searchResult);
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
