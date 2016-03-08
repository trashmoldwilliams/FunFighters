// using System.Collections.Generic;
// using System.Data.SqlClient;
// using System;
//
// namespace Fighters
// {
//   public class Ability
//   {
//     private int _id;
//     private string _name;
//     private string _user;
//     private string _target;
//     private int _multiplier;
//     private string _stat;
//     private int _statValue;
//     private int _accuracy;
//     private int _burn;
//     private bool _priority;
//     private bool _isReflect;
//
//   public Ability(int Id, string Name, string Target, string baseTarget, string Base, int Multiplier, string Stat, int Accuracy, int Burn, bool Priority, bool isBlock, bool IsReflect)
//   {
//     _id = Id;
//     _name = Name;
//     _target = Target;
//     _baseTarget = BaseTarget;
//     _base = Base;
//     _multiplier = Multiplier;
//     _stat = Stat;
//     _accuracy = Accuracy;
//     _burn = Burn;
//     _priority = Priority;
//     _isBlock = isBlock;
//     _isReflect = isReflect;
//   }
//
//   // public static void DefineAll()
//   // {
//   //   Ability jab = new Ability(1, "JAB", "opponent", "user", "attack", -0.5, ["hp"], 100, 0, false, false, false);
//   //   Ability hook = new Ability(2, "HOOK", "opponent", "user", "attack", -1, ["hp"], 65, 0, false, false, false);
//   //   Ability uppercut = new Ability(3, "UPPERCUT", "opponent", "user", "attack", -2, ["hp"], 30, 0, false, false, false);
//   //   Ability block = new Ability(4, "BLOCK", "user", "N/A", "N/A", 0, ["defense"], 999, 0, true,  true, false);
//   //   Ability blind = new Ability(5, "BLIND", "opponent", "opponent", "accuracy", -0.2, ["accuracy"], 80, 0, false, false, false);
//   //   Ability lockon = new Ability(6, "LOCKON", "user", "N/A", "attack", 0.1, ["accuracy", "luck"], 999, 0, false, false, false);
//   //   Ability pyro = new Ability(7, "PYRO", "opponent", "N/A", "attack", -0.4, ["attack"], 80, 2, false, false, false);
//   //   Ability reflect = new Ability(8, "REFLECT", "N/A", "N/A", "N/A", 0, ["N/A"], 999, 0, true, false, true);
//   // }
//
//
// }
