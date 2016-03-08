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
    private string _punchType;

    public Move(int Id, string Name, string Method, string PunchType)
    {
      _id = Id;
      _name = Name;
      _method = Method;
      _punchType = PunchType;
    }

    public static void DefineAll()
    {
      Move jab = new Move(1, "JAB", "executePunch", "jab");
      Move hook = new Move(2, "HOOK", "executePunch", "hook");
      Move uppercut = new Move(3, "UPPERCUT", "executePunch", "uppercut");
      Move block = new Move(4, "BLOCK", "executeBlock", "N/A");
      Move blind = new Move(5, "BLIND", "executeBlind", "N/A");
      Move lockon = new Move(6, "LOCKON", "executeLockon", "N/A");
      Move pyro = new Move(7, "PYRO", "executePyro", "N/A");
    }

    public string GetName()
    {
      return _name;
    }

    public string GetMethod()
    {
      return _method;
    }

    public string GetPunchType()
    {
      return _punchType;
    }
  }
}
