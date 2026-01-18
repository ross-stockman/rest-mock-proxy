import { Router, Request, Response } from 'express';

const testRouter = Router();

interface TestParams {
    id: string;
}

testRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(
        {
            "message": "Hello World!",
            "param": "stub"
        }
    );
});

testRouter.post('/', (req: Request, res: Response) => {
    res.status(201).header({
        location: 'https://stub.com'
    }).json(
        {
            "message": "Hello World!",
            "param": "stub"
        }
    );
});

testRouter.put('/:id', (req: Request<TestParams>, res: Response) => {
    const itemId: string = req.params.id;

    res.status(200).json({
        [itemId]: {
            "message": "Hello World!",
            "param": "stub"
        }
    });
});

testRouter.delete('/:id', (req: Request<TestParams>, res: Response) => {
    const itemId = req.params.id;

    res.status(204).send();
});

export default testRouter;
