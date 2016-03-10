using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Move
  {
    private int _id;
    private string _name;
    private string _method;
    private Punch _punchType;

    public Move(int Id, string Name, string Method, Punch PunchType)
    {
      _id = Id;
      _name = Name;
      _method = Method;
      _punchType = PunchType;
    }

    public static void DefineAll()
    {
      Punch jabPunch = new Punch(1, "JAB", 0.5, 100);
      Punch hookPunch = new Punch(1, "HOOK", 1, 65);
      Punch uppercutPunch = new Punch(1, "UPPERCUT", 2, 30);

      Move jab = new Move(1, "JAB", "executePunch", jabPunch);
      Move hook = new Move(2, "HOOK", "executePunch", hookPunch);
      Move uppercut = new Move(3, "UPPERCUT", "executePunch", uppercutPunch);
      Move block = new Move(4, "BLOCK", "executeBlock", new Punch(0, "PLACEHOLDER", 0, 0));
      Move blind = new Move(5, "BLIND", "executeBlind", new Punch(0, "PLACEHOLDER", 0, 0));
      Move lockon = new Move(6, "LOCKON", "executeLockon", new Punch(0, "PLACEHOLDER", 0, 0));
      Move pyro = new Move(7, "PYRO", "executePyro", new Punch(0, "PLACEHOLDER", 0, 0));
      Move frost = new Move(8, "FROST", "executeFrost", new Punch(0,"PLACEHOLDER",0,0));
    }

    public string GetName()
    {
      return _name;
    }

    public string GetMethod()
    {
      return _method;
    }

    public Punch GetPunchType()
    {
      return _punchType;
    }
  }
}
