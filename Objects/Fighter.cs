using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Fighter
  {
    private int _id;
    private string _name;
    private int _wins;
    private int _losses;
    private int _imageId;
    private double _hp;
    private double _maxhp;
    private double _mp;
    private double _maxmp;
    private double _attack;
    private double _speed;
    private double _accuracy;
    private double _luck;

    // private Move _currentMove;
    private double _defense;
    private double _burn;

    public Fighter(string Name, int ImageId, double Hp, double Mp, double Attack, double Speed, double Accuracy, double Luck, int Wins = 0, int Losses = 0, int Id = 0)
    {
      _id = Id;
      _name = Name;
      _hp = Hp;
      _maxhp = Hp;
      _mp = Mp;
      _maxmp = Mp;
      _imageId = ImageId;
      _attack = Attack;
      _speed = Speed;
      _accuracy = Accuracy;
      _luck = Luck;
      _wins = Wins;
      _losses = Losses;

      // _battleId = ;
      _defense = 1;
      _burn = 0;
    }

    public override bool Equals(System.Object otherFighter)
    {
      if (!(otherFighter is Fighter))
      {
        return false;
      }
      else
      {
        Fighter newFighter = (Fighter) otherFighter;
        bool idEquality = this.GetId() == newFighter.GetId();
        bool nameEquality = this.GetName() == newFighter.GetName();
        bool imageEquality = this.GetImageId() == newFighter.GetImageId();
        bool hpEquality = this.GetHp() == newFighter.GetHp();
        bool mpEquality = this.GetMp() == newFighter.GetMp();
        bool attackEquality = this.GetAttack() == newFighter.GetAttack();
        bool speedEquality = this.GetSpeed() == newFighter.GetSpeed();
        bool accuracyEquality = this.GetAccuracy() == newFighter.GetAccuracy();
        bool luckEquality = this.GetLuck() == newFighter.GetLuck();
        bool maxHpEquality = this.GetMaxHp() == newFighter.GetMaxHp();
        bool maxMpEquality = this.GetMaxMp() == newFighter.GetMaxMp();
        return (idEquality && nameEquality && imageEquality && hpEquality && mpEquality && speedEquality && attackEquality && accuracyEquality && luckEquality && maxMpEquality && maxHpEquality);
      }
    }
    public int GetId()
    {
      return _id;
    }
    public string GetName()
    {
      return _name;
    }
    public int GetImageId()
    {
      return _imageId;
    }
    public double GetHp()
    {
      return _hp;
    }
    public double GetMaxHp()
    {
      return _maxhp;
    }
    public double GetMp()
    {
      return _mp;
    }
    public double GetMaxMp()
    {
      return _maxmp;
    }
    public double GetAttack()
    {
      return _attack;
    }
    public double GetSpeed()
    {
      return _speed;
    }
    public double GetAccuracy()
    {
      return _accuracy;
    }
    public double GetLuck()
    {
      return _luck;
    }
    public double GetDefense()
    {
      return _defense;
    }
    public int GetWins()
    {
      return _wins;
    }
    public int GetLosses()
    {
      return _losses;
    }

    public void SetHp(double Hp)
    {
      _hp = Hp;
    }

    public void SetMp(double Mp)
    {
      _mp = Mp;
    }

    public void SetAttack(double Attack)
    {
      _attack = Attack;
    }

    public void SetSpeed(double Speed)
    {
      _speed = Speed;
    }

    public void SetAccuracy(double Accuracy)
    {
      _accuracy = Accuracy;
    }

    public void SetDefense(double Defense)
    {
      _defense = Defense;
    }

    public void SetLuck(double Luck)
    {
      _luck = Luck;
    }

    public double GetBurn()
    {
      return _burn;
    }

    public void SetBurn(double Burn)
    {
      _burn = Burn;
    }

    public void Save()
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr;
      conn.Open();

      SqlCommand cmd = new SqlCommand("INSERT INTO fighters (name, imageid, hp, mp, attack, speed, accuracy, luck, wins, losses) OUTPUT INSERTED.id VALUES (@fighterName, @fighterImage, @fighterHp, @fighterMp, @fighterAttack, @fighterSpeed, @fighterAccuracy, @fighterLuck, @fighterWins, @fighterLoss)", conn);

      SqlParameter nameParameter = new SqlParameter();
      nameParameter.ParameterName = "@fighterName";
      nameParameter.Value = this.GetName();
      cmd.Parameters.Add(nameParameter);

      SqlParameter ImageParameter = new SqlParameter();
      ImageParameter.ParameterName = "@fighterImage";
      ImageParameter.Value = this.GetImageId();
      cmd.Parameters.Add(ImageParameter);

      SqlParameter hpParameter = new SqlParameter();
      hpParameter.ParameterName = "@fighterHp";
      hpParameter.Value = this.GetHp();
      cmd.Parameters.Add(hpParameter);

      SqlParameter mpParameter = new SqlParameter();
      mpParameter.ParameterName = "@fighterMp";
      mpParameter.Value = this.GetMp();
      cmd.Parameters.Add(mpParameter);

      SqlParameter attackParameter = new SqlParameter();
      attackParameter.ParameterName = "@fighterAttack";
      attackParameter.Value = this.GetAttack();
      cmd.Parameters.Add(attackParameter);

      SqlParameter speedParameter = new SqlParameter();
      speedParameter.ParameterName = "@fighterSpeed";
      speedParameter.Value = this.GetSpeed();
      cmd.Parameters.Add(speedParameter);

      SqlParameter accuracyParameter = new SqlParameter();
      accuracyParameter.ParameterName = "@fighterAccuracy";
      accuracyParameter.Value = this.GetAccuracy();
      cmd.Parameters.Add(accuracyParameter);

      SqlParameter luckParameter = new SqlParameter();
      luckParameter.ParameterName = "@fighterLuck";
      luckParameter.Value = this.GetLuck();
      cmd.Parameters.Add(luckParameter);

      SqlParameter winsParameter = new SqlParameter();
      winsParameter.ParameterName = "@fighterWins";
      winsParameter.Value = this.GetWins();
      cmd.Parameters.Add(winsParameter);

      SqlParameter lossParameter = new SqlParameter();
      lossParameter.ParameterName = "@fighterLoss";
      lossParameter.Value = this.GetLosses();
      cmd.Parameters.Add(lossParameter);

      rdr = cmd.ExecuteReader();

      while(rdr.Read())
      {
        this._id = rdr.GetInt32(0);
      }
      if (rdr != null)
      {
        rdr.Close();
      }
      if(conn != null)
      {
        conn.Close();
      }
    }

    public string GetImageLocation()
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("SELECT image_path FROM fighter_images WHERE id = @ImageId;", conn);
      SqlParameter ImageIdParameter = new SqlParameter();
      ImageIdParameter.ParameterName = "@ImageId";
      ImageIdParameter.Value = this._imageId;
      cmd.Parameters.Add(ImageIdParameter);
      rdr = cmd.ExecuteReader();

      string foundImageLocation = null;

      while(rdr.Read())
      {
        foundImageLocation = rdr.GetString(0);
      }

      if (rdr != null)
      {
        rdr.Close();
      }
      if (conn != null)
      {
        conn.Close();
      }
      return foundImageLocation;
    }

    public static void DeleteAll()
    {
      SqlConnection conn = DB.Connection();
      conn.Open();
      SqlCommand cmd = new SqlCommand("DELETE FROM fighters;", conn);
      cmd.ExecuteNonQuery();
    }

    public static Fighter Find(int id)
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("SELECT * FROM fighters WHERE id = @fighterId;", conn);
      SqlParameter FighterIdParameter = new SqlParameter();
      FighterIdParameter.ParameterName = "@fighterId";
      FighterIdParameter.Value = id.ToString();
      cmd.Parameters.Add(FighterIdParameter);
      rdr = cmd.ExecuteReader();

      int foundFighterId = 0;
      string foundFighterName = null;
      int foundWins = 0;
      int foundLosses = 0;
      int foundImageId =  0;
      int foundHp = 0;
      int foundMp = 0;
      int foundAttack = 0;
      int foundSpeed = 0;
      int foundAccuracy = 0;
      int foundLuck = 0;

      while(rdr.Read())
      {
        foundFighterId = rdr.GetInt32(0);
        foundFighterName = rdr.GetString(1);
        foundWins = rdr.GetInt32(2);
        foundLosses = rdr.GetInt32(3);
        foundImageId =  rdr.GetInt32(4);
        foundHp = rdr.GetInt32(5);
        foundMp = rdr.GetInt32(6);
        foundAttack = rdr.GetInt32(7);
        foundSpeed = rdr.GetInt32(8);
        foundAccuracy = rdr.GetInt32(9);
        foundLuck = rdr.GetInt32(10);
      }
      Fighter foundFighter = new Fighter(foundFighterName, foundImageId, foundHp, foundMp, foundAttack, foundSpeed, foundAccuracy, foundLuck, foundWins, foundLosses, foundFighterId);

      if (rdr != null)
      {
        rdr.Close();
      }
      if (conn != null)
      {
        conn.Close();
      }
      return foundFighter;
    }

    public void UpdateRecord(int wins, int losses)
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr =  null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("UPDATE fighters SET wins = @wins, losses = @losses WHERE id = @fighters;", conn);

      SqlParameter winsParameter= new SqlParameter();
      winsParameter.ParameterName = "@wins";
      winsParameter.Value = wins;
      cmd.Parameters.Add(winsParameter);

      SqlParameter lossesParameter= new SqlParameter();
      lossesParameter.ParameterName = "@losses";
      lossesParameter.Value = losses;
      cmd.Parameters.Add(lossesParameter);

      SqlParameter fighterIdParameter = new SqlParameter();
      fighterIdParameter.ParameterName = "@fighters";
      fighterIdParameter.Value = this.GetId();
      cmd.Parameters.Add(fighterIdParameter);
      cmd.ExecuteNonQuery();

      this._wins = wins;
      this._losses = losses;

      if (conn != null)
      {
        conn.Close();
      }
    }
    public void Update(string Name, int ImageId, double Hp, double Mp, double Attack, double Speed, double Accuracy, double Luck)
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr =  null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("UPDATE fighters SET name = @fighterName, imageid = @fighterImage, hp = @fighterHp, mp = @fighterMp, attack = @fighterAttack, luck = @fighterLuck WHERE id = @fighter;", conn);

      SqlParameter nameParameter = new SqlParameter();
      nameParameter.ParameterName = "@fighterName";
      nameParameter.Value = Name;
      cmd.Parameters.Add(nameParameter);

      SqlParameter ImageParameter = new SqlParameter();
      ImageParameter.ParameterName = "@fighterImage";
      ImageParameter.Value = ImageId;
      cmd.Parameters.Add(ImageParameter);

      SqlParameter hpParameter = new SqlParameter();
      hpParameter.ParameterName = "@fighterHp";
      hpParameter.Value = Hp;
      cmd.Parameters.Add(hpParameter);

      SqlParameter mpParameter = new SqlParameter();
      mpParameter.ParameterName = "@fighterMp";
      mpParameter.Value = Mp;
      cmd.Parameters.Add(mpParameter);

      SqlParameter attackParameter = new SqlParameter();
      attackParameter.ParameterName = "@fighterAttack";
      attackParameter.Value = Attack;
      cmd.Parameters.Add(attackParameter);

      SqlParameter speedParameter = new SqlParameter();
      speedParameter.ParameterName = "@fighterSpeed";
      speedParameter.Value = Speed;
      cmd.Parameters.Add(speedParameter);

      SqlParameter accuracyParameter = new SqlParameter();
      accuracyParameter.ParameterName = "@fighterAccuracy";
      accuracyParameter.Value = Accuracy;
      cmd.Parameters.Add(accuracyParameter);

      SqlParameter luckParameter = new SqlParameter();
      luckParameter.ParameterName = "@fighterLuck";
      luckParameter.Value = Luck;
      cmd.Parameters.Add(luckParameter);

      SqlParameter idParameter = new SqlParameter();
      idParameter.ParameterName = "@fighter";
      idParameter.Value = this._id;
      cmd.Parameters.Add(idParameter);

      cmd.ExecuteNonQuery();

      this._name = Name;
      this._hp = Hp;
      this._mp = Mp;
      this._imageId = ImageId;
      this._attack = Attack;
      this._speed = Speed;
      this._accuracy = Accuracy;
      this._luck = Luck;

      if (conn != null)
      {
        conn.Close();
      }
    }
    public static List<Fighter> GetAll()
    {
      List<Fighter> allFighters = new List<Fighter>{};

      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("SELECT * FROM fighters order by wins-losses desc;", conn);
      rdr = cmd.ExecuteReader();

      while(rdr.Read())
      {
        int foundFighterId = rdr.GetInt32(0);
        string foundFighterName = rdr.GetString(1);
        int foundWins = rdr.GetInt32(2);
        int foundLosses = rdr.GetInt32(3);
        int foundImageId =  rdr.GetInt32(4);
        int foundHp = rdr.GetInt32(5);
        int foundMp = rdr.GetInt32(6);
        int foundAttack = rdr.GetInt32(7);
        int foundSpeed = rdr.GetInt32(8);
        int foundAccuracy = rdr.GetInt32(9);
        int foundLuck = rdr.GetInt32(10);
        Fighter foundFighter = new Fighter(foundFighterName, foundImageId, foundHp, foundMp, foundAttack, foundSpeed, foundAccuracy, foundAccuracy, foundWins, foundLosses, foundFighterId);
        allFighters.Add(foundFighter);
      }

      if (rdr != null)
      {
        rdr.Close();
      }
      if (conn != null)
      {
        conn.Close();
      }

      return allFighters;
    }
    public void DeleteFighter()
    {
      SqlConnection conn = DB.Connection();
      conn.Open();

      SqlCommand cmd = new SqlCommand("DELETE FROM fighters WHERE id = @FighterId;", conn);
      SqlParameter fighterIdParameter = new SqlParameter();
      fighterIdParameter.ParameterName = "@FighterId";
      fighterIdParameter.Value = this.GetId();

      cmd.Parameters.Add(fighterIdParameter);
      cmd.ExecuteNonQuery();

      if (conn != null)
      {
        conn.Close();
      }
    }
  }
}
