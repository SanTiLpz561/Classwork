import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
    .get(protect, (req, res) => {
        res.status(200).json({
            status: 'success',
            results: initiatives.length,
            data: { initiatives }
        });
    })

    .post(protect, (req, res, next) => {
        const { title, priority, status } = req.body;

        if (!title || !priority) {
            return next(new AppError('Title and priority are required to create an initiative'))
        }

        const newInitiative = {
            id: initiatives.length ? Math.max(...initiatives.map(i => i.id)) + 1 : 1,
            title,
            priority,
            status: status || 'Pending'
        };

        initiatives.push(newInitiative);

        res.status(201).json({
            status: 'success',
            data: { initiative: newInitiative }
        });
    });

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
    .get(protect, (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const initiative = initiatives.find(i => i.id === id);

        if(!initiative){
            return next(new AppError(`No initiative found with id ${id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: { initiative }
        });
    })


    .delete(protect, requireAdmin, (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const initiativeIndex = initiatives.findIndex(i => i.id === id);

        if (initiativeIndex === -1) {
            return next(new AppError(`No initiative found with id ${id}`, 404));
        }

        initiatives.splice(initiativeIndex, 1);

        res.status(204).send();
    });

export default router;
