const graphql = require('graphql');
const Timer = require('./models/timer');
const TimerEvent = require('./models/timer');

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInputObjectType} = graphql;

const TimerType = new GraphQLObjectType({
    name: 'Timer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        duration: {type: GraphQLInt},
        timerEvents: {type: new GraphQLList(TimerEventType)}
    })
});

const TimerEventType = new GraphQLObjectType({
    name: 'TimerEvent',
    fields: () => ({
        type: {type: GraphQLString},
        time: {type: GraphQLInt},
        text: {type: GraphQLString}
    })
})

const TimerEventInput = new GraphQLInputObjectType({
    name: 'TimerEventInput',
    fields: () => ({
        type: {type: GraphQLString},
        time: {type: GraphQLInt},
        text: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        timer:{
            type: TimerType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Timer.findById(args.id);
            }
        },
        timers: {
            type: new GraphQLList(TimerType),
            resolve(parent, args){
                return Timer.find({});
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTimer: {
            type: TimerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                duration: {type: new GraphQLNonNull(GraphQLInt)},
                timerEvents: {type: new GraphQLList(TimerEventInput)}
            },
            resolve(parent, args){

                let timer = new Timer({
                    name: args.name,
                    duration: args.duration,
                    timerEvents: args.timerEvents
                });
                return timer.save();
            }
        },

        updateTimer: {
            type: TimerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                duration: {type: new GraphQLNonNull(GraphQLInt)},
                timerEvents: {type: new GraphQLList(TimerEventInput)}
            },
            resolve(parent, args){

                return Timer.findOneAndUpdate(
                    { _id: args.id},
                    {
                        name: args.name,
                        duration: args.duration,
                        timerEvents: args.timerEvents
                    },
                    {new: true}
                );
            }
        },
        deleteTimer: {
            type: TimerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){

                Timer.findByIdAndDelete(args.id, function (err, timer) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Deleted : ", timer); 
                    } 
                }); 
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});