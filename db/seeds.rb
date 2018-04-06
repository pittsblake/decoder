# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Topic.destroy_all
User.destroy_all

#Topics
mvc = Topic.create({title: "MVC"})
react = Topic.create({title: "React"})
oop = Topic.create({title: "OOP"})

#user
blake = User.create({email: 'blake@gmail.com', password: 'blahblah', password_confirmation: 'blahblah'})


#Definitions
mvc_def = Definition.create({topic_id: mvc.id, user_id: blake.id, post: "It's cool", count: 0})
react_def =  Definition.create({topic_id: react.id, user_id: blake.id, post: "It does stuff", count: 0})
oop_def =  Definition.create({topic_id: oop.id, user_id: blake.id, post: "I like objects", count: 0})