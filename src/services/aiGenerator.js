// Mock AI Workout Generator
// In a real app, this would send `userData` to an LLM API and parse the JSON response.

const baseExercises = {
    Push: [
        { name: 'Bench Press', muscle: 'Chest', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Overhead Press', muscle: 'Shoulders', sets: 3, reps: '8-12', rest: 90 },
        { name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Tricep Pushdowns', muscle: 'Triceps', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Lateral Raises', muscle: 'Shoulders', sets: 4, reps: '15-20', rest: 45 }
    ],
    Pull: [
        { name: 'Barbell Row', muscle: 'Back', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Pull-ups', muscle: 'Back', sets: 3, reps: '8-12', rest: 90 },
        { name: 'Face Pulls', muscle: 'Rear Delts', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Bicep Curls', muscle: 'Biceps', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Hammer Curls', muscle: 'Biceps', sets: 3, reps: '10-15', rest: 60 }
    ],
    Legs: [
        { name: 'Squats', muscle: 'Quads', sets: 4, reps: '6-8', rest: 120 },
        { name: 'Romanian Deadlifts', muscle: 'Hamstrings', sets: 3, reps: '8-10', rest: 90 },
        { name: 'Leg Press', muscle: 'Quads/Glutes', sets: 3, reps: '10-12', rest: 90 },
        { name: 'Leg Curls', muscle: 'Hamstrings', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Calf Raises', muscle: 'Calves', sets: 4, reps: '15-20', rest: 45 }
    ]
};

export const generateWorkoutPlan = async (userData) => {
    // Simulate network delay for "AI processing" effect
    await new Promise(resolve => setTimeout(resolve, 2500));

    console.log("Generating plan for:", userData);

    // We'll return a robust Push-Pull-Legs based plan tailored slightly by goal
    // A true AI output would be fully dynamic but structurally similar to this:

    const plan = {
        weeklyOverview: "A hyper-optimized routine designed for maximum engagement and progressive overload.",
        schedule: [
            { day: "Monday", type: "Push", target: "Chest, Shoulders, Triceps", exercises: baseExercises.Push },
            { day: "Tuesday", type: "Pull", target: "Back, Biceps", exercises: baseExercises.Pull },
            { day: "Wednesday", type: "Rest", target: "Active Recovery", exercises: [] },
            { day: "Thursday", type: "Legs", target: "Quads, Hamstrings, Calves", exercises: baseExercises.Legs },
            { day: "Friday", type: "Push", target: "Chest, Shoulders, Triceps", exercises: baseExercises.Push },
            { day: "Saturday", type: "Pull", target: "Back, Biceps", exercises: baseExercises.Pull },
            { day: "Sunday", type: "Rest", target: "Active Recovery", exercises: [] }
        ]
    };

    return plan;
};
