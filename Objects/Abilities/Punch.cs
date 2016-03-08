using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Punch
  {
    private int _id;
    private string _name;
    private double _damageMultiplier;
    private double _baseAccuracy;

    public Punch(int Id, string Name, double DamageMultiplier, double baseAccuracy)
    {
      _id = Id;
      _name = Name;
      _damageMultiplier = DamageMultiplier;
      _baseAccuracy = baseAccuracy;

    }

    public double GetMultiplier()
    {
      return _damageMultiplier;
    }

    public double GetAccuracy()
    {
      return _baseAccuracy;
    }
  }
}
