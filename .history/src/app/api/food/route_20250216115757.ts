import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface Food {
    id: string;
    name: string;
    calories: number;
}

let foods: Food[] = [];

// Create a new food
router.post('/', (req: Request, res: Response) => {
    const { name, calories } = req.body;
    const newFood: Food = { id: uuidv4(), name, calories };
    foods.push(newFood);
    res.status(201).json(newFood);
});

// Read all foods
router.get('/', (req: Request, res: Response) => {
    res.json(foods);
});

// Read a single food by ID
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const food = foods.find(f => f.id === id);
    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
});

// Update a food by ID
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, calories } = req.body;
    const foodIndex = foods.findIndex(f => f.id === id);
    if (foodIndex !== -1) {
        foods[foodIndex] = { id, name, calories };
        res.json(foods[foodIndex]);
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
});

// Delete a food by ID
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    foods = foods.filter(f => f.id !== id);
    res.status(204).send();
});

export default router;