import Array "mo:base/Array";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer record type
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store the state
  stable var taxPayerEntries : [(Text, TaxPayer)] = [];

  // Initialize the HashMap with the stable variable
  var taxPayers = HashMap.HashMap<Text, TaxPayer>(10, Text.equal, Text.hash);

  // System function to handle upgrades
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayers.entries());
  };

  // System function to handle post-upgrade state
  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayerEntries.vals(), 10, Text.equal, Text.hash);
  };

  // Function to add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async () {
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
  };

  // Function to retrieve all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Function to search for a TaxPayer record by TID
  public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
    taxPayers.get(tid)
  };
}
