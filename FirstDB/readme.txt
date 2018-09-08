//Excercises performed through terminal

1. Create a database called 'my_first_db'.
>use my_first_db

2. Create students collection.
> db.createCollection("students")

3. Each document you insert into this collection should have the following format: ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})

4. Create 5 students with the appropriate info.
> db.students.insert({name: "Amelia", home_state: "BC", lucky_number: 8, birthday: {month: 04, day: 15, year: 1983}})
> db.students.insert({name: "Heather", home_state: "MB", lucky_number: 4, birthday: {month: 03, day: 19, year: 1983}})
> db.students.insert({name: "Rosemary", home_state: "MB", lucky_number: 5, birthday: {month: 09, day: 12, year: 1955}})
> db.students.insert({name: "Raymond", home_state: "MB", lucky_number: 7, birthday: {month: 06, day: 26, year: 1951}})
> db.students.insert({name: "Ryan", home_state: "MB", lucky_number: 3, birthday: {month: 12, day: 20, year: 1980}})

5. Get all students.
> db.students.find({}, {_id:0})
        {"name": "Amelia", "home_state": "BC", "lucky_number": 8, "birthday": {"month": 04, "day": 15, "year": 1983}}
        {"name": "Heather", "home_state": "MB", "lucky_number": 4, "birthday": {"month": 03, "day": 19, "year": 1983}}
        {"name": "Rosemary", "home_state": "MB", "lucky_number": 5, "birthday": {"month": 09, "day": 12, "year": 1955}}
        {"name": "Raymond", "home_state": "MB", "lucky_number": 7, "birthday": {"month": 06, "day": 26, "year": 1951}}
        {"name": "Ryan", "home_state": "MB", "lucky_number": 3, "birthday": {"month": 12, "day": 20, "year": 1980}}

6. Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
> db.students.find({$or: [{home_state: "California"}, {home_state: "Washington"}]}, {_id: 0})
        ...
        (there aren't any)

7. Get all students whose lucky number is:
a. greater than 3 (just display name and lucky number)
> db.students.find({lucky_number : {$gt: 3}}, {_id: 0, name: 1, lucky_number: 1})
        { "name" : "Amelia", "lucky_number" : 8 }
        { "name" : "Heather", "lucky_number" : 4 }
        { "name" : "Rosemary", "lucky_number" : 5 }
        { "name" : "Raymond", "lucky_number" : 7 }

b. less than or equal to 10
> db.students.find({lucky_number : {$lte: 10}}, {_id: 0, name: 1, lucky_number: 1})
        { "name" : "Amelia", "lucky_number" : 8 }
        { "name" : "Heather", "lucky_number" : 4 }
        { "name" : "Rosemary", "lucky_number" : 5 }
        { "name" : "Raymond", "lucky_number" : 7 }
        {"name": "Ryan", "lucky_number": 3}

c. between 1 and 9 (inclusive)
> db.students.find({$and: [{lucky_number : {$gte: 1}}, {lucky_number: {$lte: 9}}] }, {_id: 0, name: 1, lucky_number: 1})
    { "name" : "Amelia", "lucky_number" : 8 }
        { "name" : "Heather", "lucky_number" : 4 }
        { "name" : "Rosemary", "lucky_number" : 5 }
        { "name" : "Raymond", "lucky_number" : 7 }
        {"name": "Ryan", "lucky_number": 3}

8. Add a field to each student collection called 'interests' that is an ARRAY.  
It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
> db.students.update({}, {$set: { "interests": ["coding", "brunch", "MongoDB"]}}, false, true)
        writeResult({"nMatched" :5, "nUpserted" :0, "nModified" :5 })

9. Add some unique interests for each particular student into each of their interest arrays.
> db.students.update({name: "Amelia" },{$push: {interests:"crafts"}})
> db.students.find({}, {_id: 0, name: 1, interests: 1})
    { "name" : "Amelia", "interests" : [ "coding", "brunch", "MongoDB", "crafts" ] }
    { "name" : "Heather", "interests" : [ "coding", "brunch", "MongoDB", "gardening" ] }
    { "name" : "Rosemary", "interests" : [ "coding", "brunch", "MongoDB", "art" ] }
    { "name" : "Raymond", "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ] }
    { "name" : "Ryan", "interests" : [ "coding", "brunch", "MongoDB", "dogs" ] }

10. Add the interest 'taxes' into someone's interest array.
> db.students.update({name: "Raymond"}, {$push: {interests: "taxes"}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

11. Remove the 'taxes' interest you just added.
> db.students.update({name: "Raymond"}, {$pop: {interests: 1}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.students.find({name: "Raymond" }, {_id: 0, name: 1, interests: 1})
    { "name" : "Raymond", "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ] }

12. Remove all students who are from California (or Washington).
> db.students.deleteMany({$or: [{home_state: "California"}, {home_state: "Washington"}]})
    { "acknowledged" : true, "deletedCount" : 0 }
<Didn't have any students from California or Washington>

> db.students.find({}, {_id: 0})
    { "name" : "Amelia", "home_state" : "BC", "lucky_number" : 8, "birthday" : { "month" : 04, "day" : 15, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "crafts" ] }
    { "name" : "Heather", "home_state" : "MB", "lucky_number" : 4, "birthday" : { "month" : 03, "day" : 19, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "gardening" ] }
    { "name" : "Rosemary", "home_state" : "MB", "lucky_number" : 5, "birthday" : { "month" : 09, "day" : 12, "year" : 1955 }, "interests" : [ "coding", "brunch", "MongoDB", "art" ] }
    { "name" : "Raymond", "home_state" : "MB", "lucky_number" : 7, "birthday" : { "month" : 06 "day" : 26, "year" : 1951 }, "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ] }
    { "name" : "Ryan", "home_state" : "MB", "lucky_number" : 3, "birthday" : { "month" : 12, "day" : 20, "year" : 1980 }, "interests" : [ "coding", "brunch", "MongoDB", "dogs" ] }
13. Remove a student by name. 
> db.students.deleteOne({name: "Ryan"})
    { "acknowledged" : true, "deletedCount" : 1 }
> db.students.find({}, {_id: 0})
    { "name" : "Amelia", "home_state" : "BC", "lucky_number" : 8, "birthday" : { "month" : 04, "day" : 15, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "crafts" ] }
    { "name" : "Heather", "home_state" : "MB", "lucky_number" : 4, "birthday" : { "month" : 03, "day" : 19, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "gardening" ] }
    { "name" : "Rosemary", "home_state" : "MB", "lucky_number" : 5, "birthday" : { "month" : 09, "day" : 12, "year" : 1955 }, "interests" : [ "coding", "brunch", "MongoDB", "art" ] }
    { "name" : "Raymond", "home_state" : "MB", "lucky_number" : 7, "birthday" : { "month" : 06 "day" : 26, "year" : 1951 }, "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ] }
    
14. Remove a student whose lucky number is greater than 5 (JU ST ONE)
> db.students.deleteOne({lucky_number: {$gt: 5}})
    { "acknowledged" : true, "deletedCount" : 1 }
> db.students.find({}, {_id: 0})
    { "name" : "Heather", "home_state" : "MB", "lucky_number" : 4, "birthday" : { "month" : 03, "day" : 19, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "gardening" ] }
    { "name" : "Rosemary", "home_state" : "MB", "lucky_number" : 5, "birthday" : { "month" : 09, "day" : 12, "year" : 1955 }, "interests" : [ "coding", "brunch", "MongoDB", "art" ] }
    { "name" : "Raymond", "home_state" : "MB", "lucky_number" : 7, "birthday" : { "month" : 06 "day" : 26, "year" : 1951 }, "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ] }

15. Add a field to each student collection called 'number_of_belts' and set it to 0.
> db.students.update({}, {$set: {"number_of_belts": 0}}, false, true)
    WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
> db.students.find({}, {_id: 0})
    { "name" : "Heather", "home_state" : "MB", "lucky_number" : 4, "birthday" : { "month" : 03, "day" : 19, "year" : 1983 }, "interests" : [ "coding", "brunch", "MongoDB", "gardening" ], "number_of_belts":0  }
    { "name" : "Rosemary", "home_state" : "MB", "lucky_number" : 5, "birthday" : { "month" : 09, "day" : 12, "year" : 1955 }, "interests" : [ "coding", "brunch", "MongoDB", "art" ], "number_of_belts":0  }
    { "name" : "Raymond", "home_state" : "MB", "lucky_number" : 7, "birthday" : { "month" : 06 "day" : 26, "year" : 1951 }, "interests" : [ "coding", "brunch", "MongoDB", "airplanes" ], "number_of_belts":0 }
 
16. Increment this field by 1 for all students in Washington (Seattle Dojo).
> db.students.find({}, {_id: 0, name: 1, home_state: 1, number_of_belts: 1});
    { "name" : "Heather", "home_state" : "MB", "number_of_belts":0  }
    { "name" : "Rosemary", "home_state" : "MB", "number_of_belts":0  }
    { "name" : "Raymond", "home_state" : "MB", "number_of_belts":0 }
> db.students.update({ home_state: "Washington"}, {$inc: {number_of_belts: 1}}, false, true)
    WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
    
    <no Washington students>

> db.students.find({}, {_id: 0, name: 1, home_state: 1, number_of_belts: 1});
    { "name" : "Heather", "home_state" : "MB", "number_of_belts":0  }
    { "name" : "Rosemary", "home_state" : "MB", "number_of_belts":0  }
    { "name" : "Raymond", "home_state" : "MB", "number_of_belts":0 }

17. Rename the 'number_of_belts' field to 'belts_earned'
> db.students.update({}, {$rename: {"number_of_belts": "belts_earned"}}, false, true )
    WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
> db.students.find({}, {_id: 0, name: 1, home_state: 1, belts_earned: 1});
    { "name" : "Heather", "home_state" : "MB", "belts_earned":0  }
    { "name" : "Rosemary", "home_state" : "MB", "belts_earned":0  }
    { "name" : "Raymond", "home_state" : "MB", "belts_earned":0 }

18. Remove the 'lucky_number' field.
> db.students.find({}, {_id: 0, name: 1, lucky_number: 1})
    { "name" : "Heather",  "lucky_number" : 4 }
    { "name" : "Rosemary",  "lucky_number" : 5 }
    { "name" : "Raymond",  "lucky_number" : 7 }
 
> db.students.update({}, {$unset: {"lucky_number": ""}}, false, true)
    WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
> db.students.find({}, {_id: 0, name: 1, lucky_number: 1})
    { "name" : "Heather" }
    { "name" : "Rosemary" }
    { "name" : "Raymond" }

19. Add a 'updated_on' field, and set the value as the current date.
> db.students.update({}, {$currentDate: { updated_on: { $type: "date" }}} , false, true)
    WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
> db.students.find({}, {_id: 0, name: 1, updated_on: 1})
    { "name" : "Heather", "updated_on" : ISODate("2018-09-06T20:04:16.232Z") }
    { "name" : "Rosemary", "updated_on" : ISODate("2018-09-06T20:04:16.232Z") }
    { "name" : "Raymond", "updated_on" : ISODate("2018-09-06T20:04:16.232Z") }