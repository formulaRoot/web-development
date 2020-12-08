import Option "mo:base/Option";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

import App "./App";
import Balances "./Balances";
import Governor "./Governor";
import Types "./Types";

actor {

  type Result<S, T> = Result.Result<S, T>;

  type App = App.App;
  type Balances = Balances.Balances;
  type Governor = Governor.Governor;
  type GovError = Types.GovError;
  type AuctionId = Types.AuctionId;
  type Auction = Types.Auction;

  var app : ?App = null;
  var balances : ?Balances = null;
  var governor : ?Governor = null;

  // Performs initial setup operations by instantiating the Balances, App, and Governor canisters
  public shared(msg) func setup() : async () {
    let tempBalances = await Balances.Balances();
    await tempBalances.deposit(msg.caller, 100);
    let tempApp = await App.App(Principal.fromActor(tempBalances));

    tempApp.auctionItem(
      Principal.fromActor(tempApp),
      "example name",
      "example description",
      ""
    );

    app := ?tempApp;
    balances := ?tempBalances;
    governor := ?(await Governor.Governor(Principal.fromActor(tempApp), 0.5));
  };

  public func getAuctions() : async ([(AuctionId, Auction)]) {
    switch (app) {
      case (null) throw Prim.error("Should call setup() first");
      case (?a) { await a.getAuctions() };
    }
  };

  public shared(msg) func migrate(propNum: Nat) : async (Result<(), GovError>) {
    switch (governor) {
      case (null) #err(#noGovernor);
      case (?gov) (await gov.migrate(propNum));
    };
  };

  public shared(msg) func propose(newApp: Principal) : async (Result<Nat, GovError>) {
    switch (governor) {
      case (null) #err(#noGovernor);
      case (?gov) #ok(await gov.propose(newApp));
    };
  };

  public shared(msg) func voteForProp(propNum: Nat) : async (Result<(), GovError>) {
    switch (governor) {
      case (null) #err(#noGovernor);
      case (?gov) (await gov.voteOnProposal(propNum, #inFavor));
    };
  };

  public shared(msg) func voteAgainstProp(propNum: Nat) : async (Result<(), GovError>) {
    switch (governor) {
      case (null) #err(#noGovernor);
      case (?gov) (await gov.voteOnProposal(propNum, #against));
    };
  };

};
