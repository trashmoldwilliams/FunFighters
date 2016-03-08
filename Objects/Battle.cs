using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Battle
  {
    private Fighter _leftFighter;
    private Fighter _rightFighter;
    private List<Move> _moveDocket;
    private Fighter _isFirst;
    private Fighter _isSecond;

    public Battle(Fighter LeftFighter, Fighter RightFighter)
    {
      _leftFighter = LeftFighter;
      _rightFighter = RightFighter;
      _isFirst = new Fighter("Placeholder","Image/path", 1,1,1,1,1,1);
      _isSecond = new Fighter("Placeholder","Image/path", 1,1,1,1,1,1);
    }

    public Fighter GetLeftFighter()
    {
      return _leftFighter;
    }

    public Fighter GetRightFighter()
    {
      return _rightFighter;
    }

    public List<Move> GetMoveDocket()
    {
      return _moveDocket;
    }

    public void SetFirst(Fighter First)
    {
      _isFirst = First;
    }

    public void SetSecond(Fighter Second)
    {
      _isSecond = Second;
    }

    public void AddToDocket(Move moveInput)
    {
      _moveDocket.Add(moveInput);
    }

    public void AddMoves(Move LeftMove, Move RightMove)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1, 100);

      if(this.GetLeftFighter().GetSpeed() >= this.GetRightFighter().GetSpeed())
      {
        SetFirst(GetLeftFighter());
        SetSecond(GetRightFighter());
        this.AddToDocket(LeftMove);
        this.AddToDocket(RightMove);
      }
      else if (this.GetRightFighter().GetSpeed() >= this.GetLeftFighter().GetSpeed())
      {
        SetFirst(GetRightFighter());
        SetSecond(GetLeftFighter());
        this.AddToDocket(RightMove);
        this.AddToDocket(LeftMove);
      }
      else if (randomNumber <= 50)
      {
        SetFirst(GetLeftFighter());
        SetSecond(GetRightFighter());
        this.AddToDocket(LeftMove);
        this.AddToDocket(RightMove);
      }
      else
      {
        SetFirst(GetRightFighter());
        SetSecond(GetLeftFighter());
        this.AddToDocket(RightMove);
        this.AddToDocket(LeftMove);
      }
    }

    public void ExecuteMove(Fighter User, Fighter Opponent)
    {
      Fighter user = User;
      Fighter opponent = Opponent;

      List<Move> moveDocket = GetMoveDocket();
      Move move = moveDocket[0];
      if(move.GetMethod() == "executePunch")
      {
        this.ExecutePunch(user, opponent, move.GetPunchType());
      }
      else if (move.GetMethod() == "executeBlock")
      {
        this.ExecuteBlock(user);
      }
      else if(move.GetMethod() == "executeBlind")
      {
        this.ExecuteBlind(user, opponent);
      }
      else if (move.GetMethod() == "executeLockon")
      {
        this.ExecuteLockon(user);
      }
      else
      {
        this.ExecutePyro(user, opponent);
      }

      moveDocket.RemoveAt(0);
    }

    public double ExecutePunch(Fighter user, Fighter target, Punch punch)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1, 100);

      if(randomNumber <= (punch.GetAccuracy() + user.GetAccuracy() - target.GetSpeed()))
      {
        double damage = 0;

        if(randomNumber <= user.GetLuck())
        {
          damage = 2 * (user.GetAttack() * punch.GetMultiplier());
        }
        else
        {
          damage = user.GetAttack() * punch.GetMultiplier();
        }
        target.SetHp(target.GetHp() - (damage * target.GetDefense()));
        return (damage * target.GetDefense());
      }
      else
      {
        return 999;
      }
    }

    public double ExecuteBlock(Fighter user)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= user.GetLuck())
      {
        user.SetDefense(0.1);
        return 0.1;
      }
      else
      {
        user.SetDefense(0.65);
        return 0.65;
      }
    }

    public double ExecuteBlind(Fighter user, Fighter target)
    {
      user.SetMp(user.GetMp() - 1);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= (80 + user.GetAccuracy() - target.GetSpeed()))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetAccuracy() * 0.2;;
          target.SetAccuracy(target.GetAccuracy() * 0.8);
          return output;
        }
        else
        {
          double output = target.GetAccuracy() * 0.1;
          target.SetAccuracy(target.GetAccuracy() * 0.9);
          return output;
        }
      }
      else
      {
        return 999;
      }
    }

    public double ExecuteLockon(Fighter user)
    {
      user.SetMp(user.GetMp() - 2);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);
      // Console.WriteLine(user.GetAccuracy() + (user.GetAccuracy() * 0.4));

      if(randomNumber <= user.GetLuck())
      {
        double output = user.GetAccuracy() * 0.4;
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.4));
        return output;
      }
      else
      {
        double output = user.GetAccuracy() * 0.2;
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.2));
        return output;
      }
    }

    public double ExecutePyro(Fighter user, Fighter target)
    {
      user.SetMp(user.GetMp() - 6);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= (80 + user.GetAccuracy() - target.GetSpeed()))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetAttack() * 0.3;;
          target.SetAttack(target.GetAttack() * 0.7);
          target.SetBurn(target.GetBurn() + 60);
          return output;
        }
        else
        {
          double output = target.GetAttack() * 0.6;
          target.SetAttack(target.GetAttack() * 0.4);
          target.SetBurn(target.GetBurn() + 30);
          return output;
        }
      }
      else
      {
        return 999;
      }
    }
  }
}
