# Hierarchical Resource Language

In order to better express our model and to be more precise in how we describe permissions in HiReM, we introduce the Hierarchical Resource Language (HRL). It's a pretty simple language :) No need for a complex compiler. But even simple definitions greatly help wrap our minds around the concepts of HiReM.

So ... first ... some definitions.

**Resource Type** : A Resource Type is a class of things to which we want to control access. It could literally be anything. HiReM uses HRL to describe its own Resource Types (Accounts, Users, Roles, Permissions, etc). One particular element of a Resource Type is called a Resource Instance.

**Action** : An action is a operation that can be applied to a Resource Type. Good examples are read, write, create, etc.

**Resource Instance** : We've talked about Resource Instance before but let's give it a formal definition.
A Resource Instance is a particular element of a Resource Type. Note that by convention, we will pluralize a Resource Type's name (for example, Accounts is a Resource Type) and keep a Resource Instance name singular (for example, an Account A).

**Account** : An Account is a Resource Instance of the Accounts Resource Type and in which other Resource Instances exist. Accounts are a fundamental concept in HRL.
When a Resource Instance (r) exists within an Account (A) we say that (r) belongs to (A), or (r) -> (A).
In HiReM each Resource Instance must belong to 1 and only 1 Account.

**Child Account** : As we hinted earlier, since Accounts is a Resource Type in HiReM, each Account must belong to another Account. If Account (A1) belongs to Account (A2), or (A1) -> (A2), A1 is a Child Account of A2.

**Scope** : A scope is list of Accounts given a particular User (U). We know that each Account belong to another Account. This creates a N-tree of account instances.
Remember that Users are a Resource in HiReM so they also belong to Accounts.

Given a User U,

- `@` or the Own Account Scope : is list that contains only the Account in which the User U belongs i.e. (@,U) is [A | (U) -> (A)].

- `*` or the All Accounts Scope : is the list of all Accounts. i.e. (*,?) is [A | A].

- `+(n)` or the n-th level Children Scope : is
  - for n=0 or +(0)  is list that contains only the Account in which the User U belongs.
  - for n=k or +(k) is +(k-1) plus the list that contains all Child Accounts of +(k-1) or [ A | E (i) | A -> +\(k-1\)\[i\] ].

## Conventions
