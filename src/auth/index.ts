import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { googleLogin, login } from './login';
import { createJWT } from '../services/auth-service';

const router = Router();

router.post('/login', bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await login({ email, password })) {
      res.send({ token: createJWT({ email }) });
    }
  } catch (e) {
    res.send({ token: null });
  }
});

router.get('/google-login/:token', async (req: Request, res: Response) => {
  const idToken = req.params.token as string;
  try {
    const jwt = await googleLogin(idToken);
    res.send({ token: createJWT({ email: jwt.payload.email }) });
  } catch (e) {
    res.send({ token: null });
  }
});

export default router;
